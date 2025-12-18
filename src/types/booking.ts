import type {LabType} from './inventory';

export type BookingStatus = 'Confirmada' | 'Pendiente' | 'En Curso' | 'Finalizada' | 'Cancelada';

export interface Booking {
    id: string;
    laboratorioId: string;
    laboratorioNombre: string;
    tipoDeLab: LabType;
    solicitante: string;
    avatarUrl?: string;
    asunto: string;
    fecha: Date;
    horaInicio: string; // Formato HH:mm
    horaFin: string;    // Formato HH:mm
    estado: BookingStatus;
}

export interface BookingStats {
    reservasHoy: number;
    cambioReservasHoy: number;
    ocupacionPorcentaje: number;
    pendientes: number;
}