import {useState, useEffect, useCallback} from 'react';
import {Title, Text, Stack, Button, Group, TextInput, Paper, ActionIcon, Modal, LoadingOverlay} from '@mantine/core';
import {IconPlus, IconSearch, IconAdjustments, IconCalendar} from '@tabler/icons-react';
import {DatePickerInput} from '@mantine/dates';
import {useDisclosure} from '@mantine/hooks';
import {notifications} from '@mantine/notifications';

// Componentes
import {BookingTable} from '../components/booking/BookingTable';
import {BookingStatsGroup} from '../components/booking/BookingStatsGroup';
import {BookingForm} from '../components/booking/BookingForm';

// Tipos y Datos Mock (Stats se quedan mockeadas por ahora)
import {mockBookings, mockStats} from '../mocks/bookings';
import type {Booking} from '../types/booking';

// ==========================================
// SERVICIO DE DATOS (Patrón Repositorio)
// NOTA: Mover esto a src/services/MockBookingService.ts
// ==========================================

interface BookingFilters {
    search?: string;
    date?: Date | null;
}

class MockBookingService {
    private bookings: Booking[] = [...mockBookings];

    // Simula una petición asíncrona (como a una API)
    private async delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async getAll(filters?: BookingFilters): Promise<Booking[]> {
        await this.delay(600); // Latencia simulada

        let result = [...this.bookings];

        if (filters) {
            // Filtro por Fecha
            if (filters.date) {
                const filterDateStr = filters.date.toDateString();
                result = result.filter(b => new Date(b.fecha).toDateString() === filterDateStr);
            }
            // Filtro por Búsqueda (Texto)
            if (filters.search) {
                const term = filters.search.toLowerCase();
                result = result.filter(b =>
                    b.solicitante.toLowerCase().includes(term) ||
                    b.laboratorioNombre.toLowerCase().includes(term) ||
                    b.asunto.toLowerCase().includes(term)
                );
            }
        }

        // Ordenar por hora (ascendente)
        return result.sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));
    }

    async create(data: Omit<Booking, 'id' | 'estado'>): Promise<Booking> {
        await this.delay(500);
        const newBooking: Booking = {
            ...data,
            id: `BV-${Date.now()}`,
            estado: 'Confirmada',
            laboratorioNombre: 'Lab Asignado (Mock)' // Esto vendría del backend
        };
        this.bookings = [newBooking, ...this.bookings];
        return newBooking;
    }

    async update(id: string, data: Partial<Booking>): Promise<Booking> {
        await this.delay(500);
        const index = this.bookings.findIndex(b => b.id === id);
        if (index === -1) throw new Error("Booking not found");

        this.bookings[index] = {...this.bookings[index], ...data};
        return this.bookings[index];
    }

    async delete(id: string): Promise<void> {
        await this.delay(500);
        this.bookings = this.bookings.filter(b => b.id !== id);
    }
}

// Instancia del servicio (Singleton)
const bookingService = new MockBookingService();

// ==========================================
// COMPONENTE VISTA (UI)
// ==========================================

export function BookingView() {
    // 1. Estado de Datos
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(false);

    // 2. Estado de Filtros
    const [dateValue, setDateValue] = useState<Date | null>(new Date());
    const [search, setSearch] = useState('');

    // 3. Estado de Selección (Edición/Eliminación)
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    // 4. Modales
    const [openedForm, {open: openForm, close: closeForm}] = useDisclosure(false);
    const [openedDelete, {open: openDelete, close: closeDelete}] = useDisclosure(false);

    // --- LÓGICA DE NEGOCIO ---

    // Cargar datos (READ)
    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const data = await bookingService.getAll({
                date: dateValue,
                search: search
            });
            setBookings(data);
        } catch (error) {
            notifications.show({title: 'Error', message: 'No se pudieron cargar las reservas', color: 'red'});
        } finally {
            setLoading(false);
        }
    }, [dateValue, search]);

    // Efecto: Recargar cuando cambian los filtros
    useEffect(() => {
        loadData();
    }, [loadData]);

    // Guardar (CREATE / UPDATE)
    const handleSave = async (values: any) => {
        setLoading(true);
        try {
            if (selectedBooking) {
                // Modo Edición
                await bookingService.update(selectedBooking.id, values);
                notifications.show({title: 'Actualizado', message: 'La reserva ha sido modificada', color: 'blue'});
            } else {
                // Modo Creación
                await bookingService.create(values);
                notifications.show({title: 'Creado', message: 'Nueva reserva agendada', color: 'green'});
            }
            closeForm();
            setSelectedBooking(null);
            loadData(); // Refrescar tabla
        } catch (e) {
            notifications.show({title: 'Error', message: 'Ocurrió un error al guardar', color: 'red'});
        } finally {
            setLoading(false);
        }
    };

    // Eliminar (DELETE)
    const handleDelete = async () => {
        if (!selectedBooking) return;
        setLoading(true);
        try {
            await bookingService.delete(selectedBooking.id);
            notifications.show({
                title: 'Cancelada',
                message: 'La reserva ha sido cancelada exitosamente',
                color: 'gray'
            });
            closeDelete();
            setSelectedBooking(null);
            loadData(); // Refrescar tabla
        } catch (e) {
            notifications.show({title: 'Error', message: 'No se pudo cancelar la reserva', color: 'red'});
        } finally {
            setLoading(false);
        }
    };

    // --- MANEJADORES DE UI ---

    const handleOpenCreate = () => {
        setSelectedBooking(null); // Limpiar selección para crear uno nuevo
        openForm();
    };

    const handleOpenEdit = (item: Booking) => {
        setSelectedBooking(item); // Cargar datos del item a editar
        openForm();
    };

    const handleOpenDelete = (item: Booking) => {
        setSelectedBooking(item);
        openDelete();
    };

    return (
        <>
            <Stack gap="lg" pos="relative">
                {/* Overlay de carga para toda la sección */}
                <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{radius: "sm", blur: 2}}/>

                {/* Header */}
                <Group justify="space-between" align="center">
                    <div>
                        <Title order={2}>Reservaciones</Title>
                        <Text c="dimmed" size="sm">Gestión de horarios y laboratorios</Text>
                    </div>
                    <Button leftSection={<IconPlus size={18}/>} onClick={handleOpenCreate}>
                        Nueva Reservación
                    </Button>
                </Group>

                {/* Tarjetas de Estadísticas */}
                <BookingStatsGroup data={mockStats}/>

                {/* Barra de Filtros */}
                <Paper p="md" shadow="xs" radius="md" withBorder>
                    <Group>
                        <TextInput
                            placeholder="Buscar por solicitante, asunto o laboratorio..."
                            leftSection={<IconSearch size={16}/>}
                            style={{flex: 1}}
                            value={search}
                            onChange={(event) => setSearch(event.currentTarget.value)}
                        />
                        <DatePickerInput
                            placeholder="Filtrar por fecha"
                            leftSection={<IconCalendar size={16}/>}
                            value={dateValue}
                            onChange={setDateValue}
                            style={{width: 220}}
                            clearable
                        />
                        <ActionIcon variant="default" size="lg" aria-label="Filtros avanzados">
                            <IconAdjustments size={18}/>
                        </ActionIcon>
                    </Group>
                </Paper>

                {/* Tabla de Resultados */}
                <Paper shadow="xs" radius="md" withBorder>
                    <BookingTable
                        data={bookings}
                        onEdit={handleOpenEdit}
                        onDelete={handleOpenDelete}
                    />
                </Paper>
            </Stack>

            {/* Modal: Formulario (Crear / Editar) */}
            <Modal
                opened={openedForm}
                onClose={closeForm}
                title={selectedBooking ? "Editar Reservación" : "Nueva Reservación"}
                size="lg"
                overlayProps={{backgroundOpacity: 0.55, blur: 3}}
            >
                <BookingForm
                    // Asegúrate de actualizar BookingForm para aceptar esta prop
                    initialData={selectedBooking}
                    onSubmit={handleSave}
                    onCancel={closeForm}
                />
            </Modal>

            {/* Modal: Confirmar Eliminación */}
            <Modal
                opened={openedDelete}
                onClose={closeDelete}
                title="Cancelar Reservación"
                centered
            >
                <Stack>
                    <Text size="sm">
                        ¿Estás seguro de que deseas cancelar la reserva de <b>{selectedBooking?.solicitante}</b>?
                        Esta acción liberará el laboratorio para otros usuarios.
                    </Text>
                    <Group justify="flex-end" mt="md">
                        <Button variant="default" onClick={closeDelete}>Volver</Button>
                        <Button color="red" onClick={handleDelete}>Confirmar Cancelación</Button>
                    </Group>
                </Stack>
            </Modal>
        </>
    );
}