import type {Booking} from "../types/booking";

export interface BookingFilters {
    search?: string;
    date?: Date | null;
}

export interface IBookingRepository {
    getAll(filters?: BookingFilters): Promise<Booking[]>;

    create(booking: Omit<Booking, 'id' | 'estado'>): Promise<Booking>;

    update(id: string, booking: Partial<Booking>): Promise<Booking>;

    delete(id: string): Promise<void>;
}