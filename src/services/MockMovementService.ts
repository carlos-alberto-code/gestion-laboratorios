import {mockMovements} from "../mocks/movements";
import {mockInventory} from "../mocks/inventory"; // <--- Importamos el "DB" de inventario
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
        }

        return result.sort((a, b) => b.fecha.getTime() - a.fecha.getTime());
    }

    async registerMovement(data: Omit<Movement, 'id'>): Promise<Movement> {
        await delay(800);

        // 1. Crear el registro del movimiento
        const newMovement: Movement = {
            ...data,
            id: `MOV-${Date.now()}`
        };
        this.movements = [newMovement, ...this.movements];

        // 2. ACTUALIZAR EL INVENTARIO (Efecto secundario)
        const itemIndex = mockInventory.findIndex(i => i.id === data.itemId);

        if (itemIndex !== -1) {
            const item = mockInventory[itemIndex];

            // Lógica de actualización según el tipo de movimiento
            switch (data.tipo) {
                case 'Baja':
                    item.estado = 'De Baja';
                    // Nota: En baja no se suele borrar la ubicación histórica,
                    // o se mueve a "Almacén de Bajas", depende de la regla de negocio.
                    break;

                case 'Mantenimiento':
                    item.estado = 'En Mantenimiento';
                    break;

                case 'Préstamo':
                    item.estado = 'En Préstamo';
                    // Si hay destino definido, actualizamos ubicación temporal
                    if (data.destino) {
                        item.campus = data.destino.campus;
                        item.edificio = data.destino.edificio;
                        item.laboratorio = data.destino.laboratorio;
                    }
                    break;

                case 'Reasignación':
                    // Cambio permanente de ubicación
                    item.estado = 'Operativo'; // Se asume que al reasignar vuelve a estar operativo en su nuevo lugar
                    if (data.destino) {
                        item.campus = data.destino.campus;
                        item.edificio = data.destino.edificio;
                        item.laboratorio = data.destino.laboratorio;
                    }
                    break;
            }
            console.log(`[Simulación Backend] Item ${item.id} actualizado a estado: ${item.estado}`);
        }

        return newMovement;
    }
}