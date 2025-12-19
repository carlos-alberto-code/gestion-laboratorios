import {Group, Paper, Text, ThemeIcon, SimpleGrid} from '@mantine/core';
import {IconArrowsExchange, IconClock, IconAlertTriangle} from '@tabler/icons-react';
import type {MovementStats} from '../../types/movement';

interface StatsProps {
    data: MovementStats;
}

export function MovementStatsGroup({data}: StatsProps) {
    return (
        <SimpleGrid cols={{base: 1, sm: 3}}>
            <Paper withBorder p="md" radius="md" style={{transition: 'transform 150ms ease, box-shadow 150ms ease'}} className="stat-card">
                <Group justify="space-between">
                    <Group align="center" gap="xs">
                        <ThemeIcon color="brand" variant="light" size="lg" radius="md">
                            <IconArrowsExchange size="1.2rem" stroke={1.5}/>
                        </ThemeIcon>
                        <Text size="xs" c="dimmed" fw={700} tt="uppercase">Total Movimientos</Text>
                    </Group>
                </Group>
                <Group align="flex-end" gap="xs" mt={25}>
                    <Text fw={700} size="xl" lh={1}>{data.totalMovimientos}</Text>
                    <Text c="dimmed" size="sm">histórico</Text>
                </Group>
            </Paper>

            <Paper withBorder p="md" radius="md" style={{transition: 'transform 150ms ease, box-shadow 150ms ease'}} className="stat-card">
                <Group justify="space-between">
                    <Group align="center" gap="xs">
                        <ThemeIcon color="grape" variant="light" size="lg" radius="md">
                            <IconClock size="1.2rem" stroke={1.5}/>
                        </ThemeIcon>
                        <Text size="xs" c="dimmed" fw={700} tt="uppercase">En Préstamo</Text>
                    </Group>
                </Group>
                <Group align="flex-end" gap="xs" mt={25}>
                    <Text fw={700} size="xl" lh={1}>{data.enPrestamo}</Text>
                    <Text c="grape" size="sm" fw={500}>activos fuera</Text>
                </Group>
            </Paper>

            <Paper withBorder p="md" radius="md" style={{transition: 'transform 150ms ease, box-shadow 150ms ease'}} className="stat-card">
                <Group justify="space-between">
                    <Group align="center" gap="xs">
                        <ThemeIcon color="red" variant="light" size="lg" radius="md">
                            <IconAlertTriangle size="1.2rem" stroke={1.5}/>
                        </ThemeIcon>
                        <Text size="xs" c="dimmed" fw={700} tt="uppercase">Bajas (Mes)</Text>
                    </Group>
                </Group>
                <Group align="flex-end" gap="xs" mt={25}>
                    <Text fw={700} size="xl" lh={1}>{data.bajasMes}</Text>
                    <Text c="red" size="sm" fw={500}>retirados</Text>
                </Group>
            </Paper>
        </SimpleGrid>
    );
}