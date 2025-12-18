import {mockBookings} from "../mocks/bookings";
import type {BookingFilters, IBookingRepository} from "../interfaces/IBookingRepository.ts";
import type {Booking} from "../types/booking.ts";

// Simulamos una latencia de red
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class MockBookingService implements IBookingRepository {
    private bookings: Booking[] = [...mockBookings]; // Copia local para poder mutar

    async getAll(filters?: BookingFilters): Promise<Booking[]> {
        await delay(500); // Fake delay

        let result = [...this.bookings];

        if (filters) {
            if (filters.date) {
                // Filtrado por fecha (ignorando hora)
                result = result.filter(b =>
                    new Date(b.fecha).toDateString() === filters.date?.toDateString()
                );
            }
            if (filters.search) {
                const term = filters.search.toLowerCase();
                result = result.filter(b =>
                    b.solicitante.toLowerCase().includes(term) ||
                    b.laboratorioNombre.toLowerCase().includes(term) ||
                    b.asunto.toLowerCase().includes(term)
                );
            }
        }

        // Ordenar por hora inicio por defecto
        return result.sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));
    }

    async create(data: Omit<Booking, 'id' | 'estado'>): Promise<Booking> {
        await delay(500);
        const newBooking: Booking = {
            ...data,
            id: `BV-${Date.now()}`,
            estado: 'Confirmada', // Lógica de negocio default
            laboratorioNombre: 'Lab Asignado (Mock)' // En backend real esto vendría de un join
        };
        this.bookings = [newBooking, ...this.bookings];
        return newBooking;
    }

    async update(id: string, data: Partial<Booking>): Promise<Booking> {
        await delay(500);
        const index = this.bookings.findIndex(b => b.id === id);
        if (index === -1) throw new Error("Booking not found");

        this.bookings[index] = {...this.bookings[index], ...data};
        return this.bookings[index];
    }

    async delete(id: string): Promise<void> {
        await delay(300);
        this.bookings = this.bookings.filter(b => b.id !== id);
    }
}