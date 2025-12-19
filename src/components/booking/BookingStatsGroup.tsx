import {Group, Paper, Text, ThemeIcon, Progress, SimpleGrid} from '@mantine/core';
import {IconCalendar, IconDeviceDesktopAnalytics, IconClock, IconTrendingUp} from '@tabler/icons-react';
import type {BookingStats} from '../../types/booking';

interface StatsGroupProps {
    data: BookingStats;
}

export function BookingStatsGroup({data}: StatsGroupProps) {
    return (
        <SimpleGrid cols={{base: 1, sm: 3}}>
            <Paper withBorder p="md" radius="md" style={{transition: 'transform 150ms ease, box-shadow 150ms ease'}} className="stat-card">
                <Group justify="space-between">
                    <Group align="center" gap="xs">
                        <ThemeIcon color="brand" variant="light" size="lg" radius="md">
                            <IconCalendar size="1.2rem" stroke={1.5}/>
                        </ThemeIcon>
                        <Text size="xs" c="dimmed" fw={700} tt="uppercase">
                            Reservas Hoy
                        </Text>
                    </Group>
                    <IconCalendar size="1.4rem" className="opacity-20" stroke={1.5}/>
                </Group>

                <Group align="flex-end" gap="xs" mt={25}>
                    <Text fw={700} size="xl" lh={1}>{data.reservasHoy}</Text>
                    <Text c="teal" size="sm" fw={500} style={{display: 'flex', alignItems: 'center'}}>
                        <IconTrendingUp size="1rem" stroke={1.5} style={{marginRight: 4}}/>
                        +{data.cambioReservasHoy} vs ayer
                    </Text>
                </Group>
            </Paper>

            <Paper withBorder p="md" radius="md" style={{transition: 'transform 150ms ease, box-shadow 150ms ease'}} className="stat-card">
                <Group justify="space-between">
                    <Group align="center" gap="xs">
                        <ThemeIcon color="grape" variant="light" size="lg" radius="md">
                            <IconDeviceDesktopAnalytics size="1.2rem" stroke={1.5}/>
                        </ThemeIcon>
                        <Text size="xs" c="dimmed" fw={700} tt="uppercase">
                            Laboratorios Ocupados
                        </Text>
                    </Group>
                </Group>

                <Group align="flex-end" gap="xs" mt={25}>
                    <Text fw={700} size="xl" lh={1}>{data.ocupacionPorcentaje}%</Text>
                </Group>
                <Progress value={data.ocupacionPorcentaje} mt="md" size="sm" color="grape"/>
            </Paper>

            <Paper withBorder p="md" radius="md" style={{transition: 'transform 150ms ease, box-shadow 150ms ease'}} className="stat-card">
                <Group justify="space-between">
                    <Group align="center" gap="xs">
                        <ThemeIcon color="orange" variant="light" size="lg" radius="md">
                            <IconClock size="1.2rem" stroke={1.5}/>
                        </ThemeIcon>
                        <Text size="xs" c="dimmed" fw={700} tt="uppercase">
                            Pendientes
                        </Text>
                    </Group>
                </Group>

                <Group align="flex-end" gap="xs" mt={25}>
                    <Text fw={700} size="xl" lh={1}>{data.pendientes}</Text>
                    <Text c="dimmed" size="sm" fw={500}>
                        Requieren aprobación
                    </Text>
                </Group>
            </Paper>
        </SimpleGrid>
    );
}