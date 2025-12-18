import {useState} from 'react';
import {Title, Text, Stack, Button, Group, TextInput, Paper, ActionIcon, Modal} from '@mantine/core';
import {IconPlus, IconSearch, IconAdjustments, IconCalendar} from '@tabler/icons-react';
import {DatePickerInput} from '@mantine/dates';
import {useDisclosure} from '@mantine/hooks';
import {notifications} from '@mantine/notifications';

import {mockBookings, mockStats} from '../mocks/bookings';
import {BookingTable} from '../components/booking/BookingTable';
import {BookingStatsGroup} from '../components/booking/BookingStatsGroup';
import {BookingForm} from '../components/booking/BookingForm';
import type {Booking} from '../types/booking';

export function BookingView() {
    // Estado local para simular base de datos
    const [bookings, setBookings] = useState<Booking[]>(mockBookings);

    // Estado para filtros
    const [dateValue, setDateValue] = useState<Date | null>(new Date());
    const [search, setSearch] = useState('');

    // Control del Modal
    const [opened, {open, close}] = useDisclosure(false);

    // Manejador para crear nueva reserva
    const handleCreate = (values: any) => {
        // Simulamos la creación de un objeto completo
        const newBooking: Booking = {
            id: `BV-${Date.now()}`, // ID temporal
            laboratorioId: values.laboratorioId || 'LAB-GENERIC',
            laboratorioNombre: values.laboratorioId ? 'Lab Asignado' : 'Laboratorio Pendiente',
            tipoDeLab: values.tipoDeLab,
            solicitante: values.solicitante,
            asunto: values.asunto,
            fecha: values.fecha,
            horaInicio: values.horaInicio,
            horaFin: values.horaFin,
            estado: 'Confirmada', // Por defecto confirmada en este mock
            avatarUrl: undefined // Sin avatar por ahora
        };

        setBookings((prev) => [newBooking, ...prev]);

        notifications.show({
            title: 'Reservación Creada',
            message: `Se ha agendado correctamente para ${values.solicitante}`,
            color: 'green',
        });

        close();
    };

    // Filtrado simple (Frontend)
    const filteredBookings = bookings.filter(item => {
        const matchesSearch = item.solicitante.toLowerCase().includes(search.toLowerCase()) ||
            item.laboratorioNombre.toLowerCase().includes(search.toLowerCase());
        // Aquí podrías agregar lógica de fecha si quisieras filtrar por el dateValue
        return matchesSearch;
    });

    return (
        <>
            <Stack gap="lg">
                {/* Header */}
                <Group justify="space-between" align="center">
                    <div>
                        <Title order={2}>Reservaciones</Title>
                        <Text c="dimmed" size="sm">Gestión de horarios y laboratorios</Text>
                    </div>
                    <Button leftSection={<IconPlus size={18}/>} onClick={open}>
                        Nueva Reservación
                    </Button>
                </Group>

                {/* Stats Cards */}
                <BookingStatsGroup data={mockStats}/>

                {/* Filters Bar */}
                <Paper p="md" shadow="xs" radius="md" withBorder>
                    <Group>
                        <TextInput
                            placeholder="Buscar por solicitante o laboratorio..."
                            leftSection={<IconSearch size={16}/>}
                            style={{flex: 1}}
                            value={search}
                            onChange={(event) => setSearch(event.currentTarget.value)}
                        />
                        <DatePickerInput
                            placeholder="Seleccionar fecha"
                            leftSection={<IconCalendar size={16}/>}
                            value={dateValue}
                            onChange={setDateValue}
                            style={{width: 200}}
                            clearable={false}
                        />
                        <ActionIcon variant="default" size="lg" aria-label="Filtros avanzados">
                            <IconAdjustments size={18}/>
                        </ActionIcon>
                    </Group>
                </Paper>

                {/* Table */}
                <Paper shadow="xs" radius="md" withBorder>
                    <BookingTable data={filteredBookings}/>
                </Paper>
            </Stack>

            {/* Modal de Creación */}
            <Modal
                opened={opened}
                onClose={close}
                title="Nueva Reservación"
                size="lg"
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
            >
                <BookingForm
                    onSubmit={handleCreate}
                    onCancel={close}
                />
            </Modal>
        </>
    );
}