import type {Booking, BookingStats} from '../types/booking';

export const mockStats: BookingStats = {
    reservasHoy: 12,
    cambioReservasHoy: 2,
    ocupacionPorcentaje: 85,
    pendientes: 3
};

export const mockBookings: Booking[] = [
    {
        id: 'BV-001',
        laboratorioId: 'LAB-101',
        laboratorioNombre: 'Lab Química 1',
        tipoDeLab: 'Laboratorio de Química',
        solicitante: 'Ana López',
        asunto: 'Clase Intro Química',
        fecha: new Date(),
        horaInicio: '08:00',
        horaFin: '10:00',
        estado: 'Confirmada',
    },
    {
        id: 'BV-002',
        laboratorioId: 'LAB-202',
        laboratorioNombre: 'Lab Física 2',
        tipoDeLab: 'Laboratorio de Cómputo',
        solicitante: 'Carlos Ruiz',
        asunto: 'Proyecto Final',
        fecha: new Date(),
        horaInicio: '10:00',
        horaFin: '12:00',
        estado: 'En Curso',
    },
    {
        id: 'BV-003',
        laboratorioId: 'LAB-303',
        laboratorioNombre: 'Lab Cómputo',
        tipoDeLab: 'Laboratorio de Cómputo',
        solicitante: 'María Gómez',
        asunto: 'Mantenimiento Preventivo',
        fecha: new Date(),
        horaInicio: '12:00',
        horaFin: '14:00',
        estado: 'Finalizada',
    },
    {
        id: 'BV-004',
        laboratorioId: 'LAB-404',
        laboratorioNombre: 'Lab Biología',
        tipoDeLab: 'Laboratorio de Química',
        solicitante: 'Jorge Vega',
        asunto: 'Investigación Celular',
        fecha: new Date(),
        horaInicio: '14:00',
        horaFin: '16:00',
        estado: 'Pendiente',
    },
];