import type {Movement, MovementStats} from '../types/movement';

export const mockMovementStats: MovementStats = {
    totalMovimientos: 145,
    enPrestamo: 12,
    enMantenimiento: 5,
    bajasMes: 2
};

export const mockMovements: Movement[] = [
    {
        id: 'MOV-001',
        itemId: 'INV-0002',
        itemNombre: 'Router Cisco',
        fecha: new Date('2024-03-10T10:00:00'),
        tipo: 'Mantenimiento',
        origen: {campus: 'Campus Norte', edificio: 'Edificio Redes', laboratorio: 'Lab Redes 2'},
        destino: {campus: 'Externo', edificio: 'Taller Central', laboratorio: 'Soporte'},
        responsable: 'Carlos Ruiz',
        motivo: 'Fallo en puerto WAN'
    },
    {
        id: 'MOV-002',
        itemId: 'INV-0004',
        itemNombre: 'Mesa de Trabajo',
        fecha: new Date('2024-03-12T09:30:00'),
        tipo: 'Reasignación',
        origen: {campus: 'Campus Central', edificio: 'Edificio A', laboratorio: 'Lab Diseño 3'},
        destino: {campus: 'Campus Sur', edificio: 'Ingeniería', laboratorio: 'Lab Prototipos'},
        responsable: 'Ana López',
        motivo: 'Solicitud de expansión de área'
    },
    {
        id: 'MOV-003',
        itemId: 'INV-0006',
        itemNombre: 'Estación de Soldadura',
        fecha: new Date('2024-03-14T15:45:00'),
        tipo: 'Préstamo',
        origen: {campus: 'Campus Central', edificio: 'Edificio B', laboratorio: 'Lab Electrónica 2'},
        destino: {campus: 'Campus Central', edificio: 'Edificio A', laboratorio: 'Aula Magna'},
        responsable: 'Jorge Vega',
        motivo: 'Clase demostrativa'
    }
];