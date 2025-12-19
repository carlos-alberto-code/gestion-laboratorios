import {Timeline, Text, Group, Badge, ThemeIcon, Card, Stack, ScrollArea, Avatar} from '@mantine/core';
import {IconClock, IconFlask, IconCalendarEvent} from '@tabler/icons-react';
import type {Booking, BookingStatus} from '../../types/booking'; // Asegúrate que la ruta sea correcta

interface AgendaTimelineProps {
    bookings: Booking[];
}

// Helper para obtener color según el estado
const getStatusColor = (status: BookingStatus) => {
    switch (status) {
        case 'Confirmada':
            return 'teal';
        case 'En Curso':
            return 'blue';
        case 'Pendiente':
            return 'yellow';
        case 'Cancelada':
            return 'red';
        case 'Finalizada':
            return 'gray';
        default:
            return 'gray';
    }
};

export function AgendaTimeline({bookings}: AgendaTimelineProps) {

    const processBookings = () => {
        // 1. Definir rango de fechas (Hoy -> Hoy + 7 días)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const limitDate = new Date(today);
        limitDate.setDate(today.getDate() + 7);

        // 2. Filtrar
        const filtered = bookings.filter(b => {
            // Asegurar que sea objeto Date
            const bookingDate = new Date(b.fecha);
            // Normalizar hora para comparar solo fechas
            bookingDate.setHours(0, 0, 0, 0);

            return bookingDate >= today && bookingDate <= limitDate;
        });

        // 3. Ordenar (Primero por fecha, luego por hora de inicio)
        filtered.sort((a, b) => {
            const dateA = new Date(a.fecha).getTime();
            const dateB = new Date(b.fecha).getTime();
            if (dateA !== dateB) return dateA - dateB;

            // Si es el mismo día, comparar horas (string 'HH:mm')
            return a.horaInicio.localeCompare(b.horaInicio);
        });

        // 4. Agrupar por día para la visualización
        const groups: Record<string, Booking[]> = {};

        filtered.forEach(b => {
            const dateObj = new Date(b.fecha);
            // Usar UTC o local dependiendo de cómo guardes las fechas,
            // generalmente para visualización simple:
            const dateKey = dateObj.toLocaleDateString('es-ES', {
                weekday: 'long',
                day: 'numeric',
                month: 'long'
            });

            const capitalizedKey = dateKey.charAt(0).toUpperCase() + dateKey.slice(1);

            if (!groups[capitalizedKey]) {
                groups[capitalizedKey] = [];
            }
            groups[capitalizedKey].push(b);
        });

        return groups;
    };

    const groupedBookings = processBookings();
    const hasBookings = Object.keys(groupedBookings).length > 0;

    if (!hasBookings) {
        return (
            <Stack align="center" py="xl" c="dimmed">
                <IconCalendarEvent size={40} opacity={0.5}/>
                <Text>No hay actividades programadas para los próximos 7 días.</Text>
            </Stack>
        );
    }

    return (
        <ScrollArea h={500} offsetScrollbars type="auto">
            <Stack gap="xl" pr="md" pl="xs" pt="xs">
                {Object.entries(groupedBookings).map(([dateLabel, daysBookings]) => (
                    <div key={dateLabel}>
                        {/* Cabecera del día */}
                        <Badge
                            size="lg"
                            variant="light"
                            color="gray"
                            mb="md"
                            radius="sm"
                            styles={{root: {textTransform: 'capitalize', fontSize: '0.95rem'}}}
                        >
                            {dateLabel}
                        </Badge>

                        <Timeline active={-1} bulletSize={26} lineWidth={2}>
                            {daysBookings.map((booking) => (
                                <Timeline.Item
                                    key={booking.id}
                                    bullet={
                                        <ThemeIcon
                                            size={22}
                                            radius="xl"
                                            color={getStatusColor(booking.estado)}
                                            variant="light"
                                        >
                                            <IconFlask size={14}/>
                                        </ThemeIcon>
                                    }
                                    title={
                                        <Text fw={600} size="sm" lineClamp={1}>
                                            {booking.asunto}
                                        </Text>
                                    }
                                >
                                    <Card
                                        withBorder
                                        padding="xs"
                                        radius="md"
                                        mt={4}
                                        bg="var(--mantine-color-body)"
                                        style={{borderLeft: `4px solid var(--mantine-color-${getStatusColor(booking.estado)}-filled)`}}
                                    >
                                        {/* Hora y Estado */}
                                        <Group justify="space-between" mb={6}>
                                            <Group gap={6}>
                                                <IconClock size={14} style={{opacity: 0.6}}/>
                                                <Text size="xs" fw={700} c="dimmed">
                                                    {booking.horaInicio} - {booking.horaFin}
                                                </Text>
                                            </Group>
                                            <Badge size="xs" variant="transparent" c={getStatusColor(booking.estado)}>
                                                {booking.estado}
                                            </Badge>
                                        </Group>

                                        {/* Laboratorio */}
                                        <Text size="xs" mb={8}>
                                            <Text span c="dimmed">Laboratorio: </Text>
                                            <Text span fw={500}>{booking.laboratorioNombre}</Text>
                                        </Text>

                                        {/* Solicitante */}
                                        <Group gap="xs">
                                            {booking.avatarUrl ? (
                                                <Avatar src={booking.avatarUrl} size={20} radius="xl"/>
                                            ) : (
                                                <Avatar size={20} radius="xl"
                                                        color="initials">{booking.solicitante.substring(0, 2)}</Avatar>
                                            )}
                                            <Text size="xs" c="dimmed">{booking.solicitante}</Text>
                                        </Group>
                                    </Card>
                                </Timeline.Item>
                            ))}
                        </Timeline>
                    </div>
                ))}
            </Stack>
        </ScrollArea>
    );
}