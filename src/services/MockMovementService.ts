import {mockMovements} from "../mocks/movements";
import type {IMovementRepository, MovementFilters} from "../interfaces/IMovementRepository";
import type {Movement} from "../types/movement";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class MockMovementService implements IMovementRepository {
    private movements: Movement[] = [...mockMovements];

    async getAll(filters?: MovementFilters): Promise<Movement[]> {
        await delay(600);
        let result = [...this.movements];

        if (filters) {
            if (filters.search) {
                const term = filters.search.toLowerCase();
                result = result.filter(m =>
                    m.itemNombre.toLowerCase().includes(term) ||
                    m.responsable.toLowerCase().includes(term) ||
                    m.id.toLowerCase().includes(term)
                );
            }
            if (filters.tipo) {
                result = result.filter(m => m.tipo === filters.tipo);
            }
            // Aquí iría la lógica de fechas si fuera necesario
        }

        // Ordenar por fecha descendente (lo más reciente primero)
        return result.sort((a, b) => b.fecha.getTime() - a.fecha.getTime());
    }

    async registerMovement(data: Omit<Movement, 'id'>): Promise<Movement> {
        await delay(800); // Simular transacción más pesada
        const newMovement: Movement = {
            ...data,
            id: `MOV-${Date.now()}`
        };
        this.movements = [newMovement, ...this.movements];

        // NOTA: En un backend real, aquí también actualizaríamos la colección 'inventory'
        console.log("Inventario actualizado (Simulación):", data.itemId, "->", data.destino);

        return newMovement;
    }
}