import type {Movement, MovementType} from "../types/movement.ts";

export interface MovementFilters {
    search?: string;      // Buscar por nombre de ítem o responsable
    tipo?: MovementType | null;
    fechaInicio?: Date | null;
    fechaFin?: Date | null;
}

export interface IMovementRepository {
    getAll(filters?: MovementFilters): Promise<Movement[]>;

    // Registrar un movimiento implica crear el log Y mover el inventario
    registerMovement(movement: Omit<Movement, 'id'>): Promise<Movement>;
}