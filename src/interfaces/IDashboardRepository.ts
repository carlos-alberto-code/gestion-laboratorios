import type {DashboardKPIs, AssetDistribution} from "../types/dashboard";
import type {Booking} from "../types/booking";

export interface IDashboardRepository {
    // Obtiene los indicadores principales
    getKPIs(): Promise<DashboardKPIs>;

    // Obtiene datos para la gráfica de distribución
    getAssetDistribution(): Promise<AssetDistribution[]>;

    // Obtiene la lista de actividad reciente
    getRecentActivity(): Promise<Booking[]>;
}