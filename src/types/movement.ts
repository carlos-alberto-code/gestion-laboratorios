export type MovementType =
    | 'Reasignación'     // Cambio permanente
    | 'Préstamo'         // Temporal
    | 'Mantenimiento'    // Salida a reparación
    | 'Baja';           // Salida definitiva

export interface LocationSnapshot {
    campus: string;
    edificio: string;
    laboratorio: string;
}

export interface Movement {
    id: string;
    itemId: string;           // ID del activo (FK)
    itemNombre: string;       // Nombre desnormalizado (para no buscarlo siempre)

    fecha: Date;
    tipo: MovementType;

    origen: LocationSnapshot;
    destino: LocationSnapshot | null; // Null si es una Baja

    responsable: string;       // Usuario que registró
    motivo?: string;           // Notas opcionales
}

export interface MovementStats {
    totalMovimientos: number;
    enPrestamo: number;
    enMantenimiento: number;
    bajasMes: number;
}