export type ItemStatus =
    | 'Operativo'
    | 'En Mantenimiento'
    | 'De Baja'
    | 'En Préstamo';


export type ItemCategory =
    | 'Cómputo'
    | 'Mobiliario'
    | 'Electrónica'
    | 'Redes'
    | 'Química'
    | 'Diseño';


export type LabType =
    | 'Laboratorio de Cómputo'
    | 'Laboratorio de Redes'
    | 'Laboratorio de Química'
    | 'Laboratorio de Diseño'
    | 'Laboratorio de Electrónica';


export interface InventoryItem {
    id: string;
    nombre: string;
    categoria: ItemCategory;
    estado: ItemStatus;

    campus: string;
    edificio: string;
    laboratorio: string;
    tipoDeLab: LabType;

    fechaAdquisicion?: Date;
    ultimoMantenimiento?: Date;
    proveedor?: string;
    costo?: number;
}


export interface FilterState {
    campus: string | null;
    edificio: string | null;
    tipoDeLab: LabType | null;
    categoria: ItemCategory | null;
    estado: ItemStatus | null;
}
