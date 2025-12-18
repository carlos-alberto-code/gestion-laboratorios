// src/views/BookingView.tsx
import {useState} from 'react';
import {Title, Text, Stack, Button, Group, TextInput, Paper, ActionIcon} from '@mantine/core';
import {IconPlus, IconSearch, IconAdjustments, IconCalendar} from '@tabler/icons-react';
import {DatePickerInput} from '@mantine/dates';

import {mockBookings, mockStats} from '../mocks/bookings';
import {BookingTable} from '../components/booking/BookingTable';
import {BookingStatsGroup} from '../components/booking/BookingStatsGroup';

export function BookingView() {
    const [dateValue, setDateValue] = useState<Date | null>(new Date());
    const [search, setSearch] = useState('');

    return (
        <Stack gap="lg">
            {/* Header */}
            <Group justify="space-between" align="center">
                <div>
                    <Title order={2}>Reservaciones</Title>
                    <Text c="dimmed" size="sm">Gestión de horarios y laboratorios</Text>
                </div>
                <Button leftSection={<IconPlus size={18}/>}>
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
                <BookingTable data={mockBookings}/>
            </Paper>
        </Stack>
    );
}