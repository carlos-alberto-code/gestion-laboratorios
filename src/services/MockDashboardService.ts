import type {IDashboardRepository} from "../interfaces/IDashboardRepository";
import type {DashboardKPIs, AssetDistribution} from "../types/dashboard";
import type {Booking} from "../types/booking";
import {mockInventory} from "../mocks/inventory";
import {mockBookings} from "../mocks/bookings";

export class MockDashboardService implements IDashboardRepository {

    private async delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async getKPIs(): Promise<DashboardKPIs> {
        await this.delay(600);

        const totalActivos = mockInventory.length;
        const enMantenimiento = mockInventory.filter(i => i.estado === 'En Mantenimiento').length;
        const operativos = mockInventory.filter(i => i.estado === 'Operativo').length;

        // Sumar costos (asegurando que no sea undefined)
        const valorTotal = mockInventory.reduce((acc, item) => acc + (item.costo || 0), 0);

        // Reservas que requieren atención o están activas
        const reservasActivas = mockBookings.filter(b =>
            ['Confirmada', 'En Curso', 'Pendiente'].includes(b.estado)
        ).length;

        return {
            totalActivos,
            activosOperativos: operativos,
            activosEnMantenimiento: enMantenimiento,
            valorTotalInventario: valorTotal,
            reservasActivas
        };
    }

    async getAssetDistribution(): Promise<AssetDistribution[]> {
        await this.delay(500);

        const total = mockInventory.length || 1;

        // Inicializar contadores
        const counts: Record<string, number> = {
            'Operativo': 0,
            'En Mantenimiento': 0,
            'En Préstamo': 0,
            'De Baja': 0
        };

        mockInventory.forEach(item => {
            if (counts[item.estado] !== undefined) {
                counts[item.estado]++;
            }
        });

        return [
            {
                label: 'Operativo',
                count: counts['Operativo'],
                color: 'teal',
                percentage: (counts['Operativo'] / total) * 100
            },
            {
                label: 'En Préstamo',
                count: counts['En Préstamo'],
                color: 'blue',
                percentage: (counts['En Préstamo'] / total) * 100
            },
            {
                label: 'Mantenimiento',
                count: counts['En Mantenimiento'],
                color: 'orange',
                percentage: (counts['En Mantenimiento'] / total) * 100
            },
            {label: 'De Baja', count: counts['De Baja'], color: 'red', percentage: (counts['De Baja'] / total) * 100},
        ];
    }

    async getRecentActivity(): Promise<Booking[]> {
        await this.delay(400);
        // Ordenar por fecha descendente y tomar las últimas 5
        return [...mockBookings]
            .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
            .slice(0, 5);
    }
}