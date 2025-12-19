import {useEffect, useState, useCallback} from 'react';
import {
    Grid,
    Paper,
    Text,
    Title,
    Group,
    SimpleGrid,
    ThemeIcon,
    RingProgress,
    Stack,
    Table,
    Badge,
    LoadingOverlay,
    Button,
    rem
} from '@mantine/core';
import {
    IconCpu,
    IconAlertTriangle,
    IconCalendarStats,
    IconCoin,
    IconArrowRight,
    IconRefresh,
    IconTrendingUp
} from '@tabler/icons-react';

// Importaciones limpias
import {MockDashboardService} from '../services/MockDashboardService';
import type {DashboardKPIs, AssetDistribution} from '../types/dashboard';
import type {Booking} from '../types/booking';

// Instancia del servicio (Singleton)
const dashboardService = new MockDashboardService();

export function DashboardView() {
    // --- ESTADO ---
    const [loading, setLoading] = useState(true);
    const [kpis, setKpis] = useState<DashboardKPIs | null>(null);
    const [distribution, setDistribution] = useState<AssetDistribution[]>([]);
    const [recentActivity, setRecentActivity] = useState<Booking[]>([]);

    // --- LÓGICA DE NEGOCIO ---
    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const [kpiData, distData, activityData] = await Promise.all([
                dashboardService.getKPIs(),
                dashboardService.getAssetDistribution(),
                dashboardService.getRecentActivity()
            ]);

            setKpis(kpiData);
            setDistribution(distData);
            setRecentActivity(activityData);
        } catch (error) {
            console.error("Error al cargar el dashboard:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('es-MX', {style: 'currency', currency: 'USD'}).format(val);
    };

    // --- UI HELPERS ---
    const StatCard = ({title, value, icon: Icon, color, diff}: any) => (
        <Paper withBorder p="md" radius="md">
            <Group justify="space-between">
                <Text size="xs" c="dimmed" fw={700} tt="uppercase">
                    {title}
                </Text>
                <ThemeIcon color={color} variant="light" size="lg" radius="md">
                    <Icon style={{width: rem(22), height: rem(22)}} stroke={1.5}/>
                </ThemeIcon>
            </Group>

            <Group align="flex-end" gap="xs" mt={25}>
                <Text fw={700} size="xl" lh={1}>{value}</Text>
                {diff && (
                    <Text c="teal" size="sm" fw={500} style={{display: 'flex', alignItems: 'center'}}>
                        <IconTrendingUp size="1rem" stroke={1.5} style={{marginRight: 4}}/>
                        {diff}%
                    </Text>
                )}
            </Group>
        </Paper>
    );

    // --- RENDER ---
    return (
        <Stack gap="lg" pos="relative">
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{radius: "sm", blur: 2}}/>

            {/* Header */}
            <Group justify="space-between" align="center">
                <div>
                    <Title order={2}>Panel de Control</Title>
                    <Text c="dimmed" size="sm">Visión general del estado de los laboratorios</Text>
                </div>
                <Button
                    variant="light"
                    leftSection={<IconRefresh size={18}/>}
                    onClick={loadData}
                    loading={loading}
                >
                    Actualizar
                </Button>
            </Group>

            {/* KPIs */}
            <SimpleGrid cols={{base: 1, sm: 2, md: 4}}>
                <StatCard
                    title="Total Activos"
                    value={kpis?.totalActivos || 0}
                    icon={IconCpu}
                    color="brand"
                />
                <StatCard
                    title="En Mantenimiento"
                    value={kpis?.activosEnMantenimiento || 0}
                    icon={IconAlertTriangle}
                    color="yellow"
                />
                <StatCard
                    title="Valor Inventario"
                    value={formatCurrency(kpis?.valorTotalInventario || 0)}
                    icon={IconCoin}
                    color="grape"
                />
                <StatCard
                    title="Reservas Activas"
                    value={kpis?.reservasActivas || 0}
                    icon={IconCalendarStats}
                    color="teal"
                />
            </SimpleGrid>

            {/* Gráficas y Tablas */}
            <Grid gutter="md">
                <Grid.Col span={{base: 12, md: 4}}>
                    <Paper withBorder p="md" radius="md" h="100%">
                        <Title order={4} mb="xl">Estado del Inventario</Title>
                        <Stack align="center" justify="center">
                            <RingProgress
                                size={220}
                                thickness={24}
                                roundCaps
                                label={
                                    <Text size="xs" ta="center" px="xs" c="dimmed" style={{pointerEvents: 'none'}}>
                                        Total
                                    </Text>
                                }
                                sections={distribution.map(d => ({
                                    value: d.percentage,
                                    color: d.color,
                                    tooltip: `${d.label}: ${d.count}`
                                }))}
                            />
                            <SimpleGrid cols={2} mt="md" w="100%">
                                {distribution.map(d => (
                                    <Group key={d.label} gap={6}>
                                        <div style={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: '50%',
                                            backgroundColor: `var(--mantine-color-${d.color}-6)`
                                        }}/>
                                        <Text size="xs" c="dimmed">{d.label} ({d.count})</Text>
                                    </Group>
                                ))}
                            </SimpleGrid>
                        </Stack>
                    </Paper>
                </Grid.Col>

                <Grid.Col span={{base: 12, md: 8}}>
                    <Paper withBorder p="md" radius="md" h="100%">
                        <Group justify="space-between" mb="md">
                            <Title order={4}>Actividad Reciente</Title>
                            <Button variant="subtle" color="brand" size="xs" rightSection={<IconArrowRight size={14}/>}>
                                Ver agenda
                            </Button>
                        </Group>
                        <Table.ScrollContainer minWidth={500}>
                            <Table verticalSpacing="xs">
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>Laboratorio</Table.Th>
                                        <Table.Th>Solicitante</Table.Th>
                                        <Table.Th>Horario</Table.Th>
                                        <Table.Th>Estado</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {recentActivity.map((item) => (
                                        <Table.Tr key={item.id}>
                                            <Table.Td>
                                                <Text size="sm" fw={500}>{item.laboratorioNombre}</Text>
                                                <Text size="xs" c="dimmed">{item.tipoDeLab}</Text>
                                            </Table.Td>
                                            <Table.Td>
                                                <Text size="sm">{item.solicitante}</Text>
                                            </Table.Td>
                                            <Table.Td>
                                                <Badge variant="dot" color="gray" size="sm">
                                                    {item.horaInicio} - {item.horaFin}
                                                </Badge>
                                            </Table.Td>
                                            <Table.Td>
                                                <Badge
                                                    size="sm"
                                                    variant="light"
                                                    color={item.estado === 'Confirmada' ? 'green' : item.estado === 'En Curso' ? 'blue' : 'gray'}
                                                >
                                                    {item.estado}
                                                </Badge>
                                            </Table.Td>
                                        </Table.Tr>
                                    ))}
                                    {recentActivity.length === 0 && (
                                        <Table.Tr>
                                            <Table.Td colSpan={4} align="center">
                                                <Text c="dimmed" py="lg">No hay actividad reciente</Text>
                                            </Table.Td>
                                        </Table.Tr>
                                    )}
                                </Table.Tbody>
                            </Table>
                        </Table.ScrollContainer>
                    </Paper>
                </Grid.Col>
            </Grid>
        </Stack>
    );
}