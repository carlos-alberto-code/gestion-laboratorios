export interface DashboardKPIs {
    totalActivos: number;
    activosOperativos: number;
    activosEnMantenimiento: number;
    valorTotalInventario: number;
    reservasActivas: number;
}

export interface AssetDistribution {
    label: string;
    count: number;
    color: string;
    percentage: number;
}