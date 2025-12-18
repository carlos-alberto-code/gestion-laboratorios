import {useState, useEffect, useCallback} from 'react';
import {Title, Text, Stack, Button, Group, TextInput, Paper, Select, LoadingOverlay} from '@mantine/core';
import {IconPlus, IconSearch, IconFilter} from '@tabler/icons-react';
import {notifications} from '@mantine/notifications';

// Componentes
import {MovementTable} from '../components/movements/MovementTable';
import {MovementStatsGroup} from '../components/movements/MovementStatsGroup';

// Servicios y Tipos
import {MockMovementService} from '../services/MockMovementService';
import {mockMovementStats} from '../mocks/movements'; // Mock de stats fijo por ahora
import type {Movement, MovementType} from '../types/movement';

const movementService = new MockMovementService();

export function MovementsView() {
    const [movements, setMovements] = useState<Movement[]>([]);
    const [loading, setLoading] = useState(false);

    // Filtros
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState<string | null>(null);

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const data = await movementService.getAll({
                search: search,
                tipo: typeFilter as MovementType | null
            });
            setMovements(data);
        } catch (error) {
            notifications.show({title: 'Error', message: 'No se pudo cargar el historial', color: 'red'});
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [search, typeFilter]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    return (
        <Stack gap="lg" pos="relative">
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{radius: "sm", blur: 2}}/>

            {/* Header */}
            <Group justify="space-between" align="center">
                <div>
                    <Title order={2}>Movimientos e Historial</Title>
                    <Text c="dimmed" size="sm">Trazabilidad de activos entre laboratorios</Text>
                </div>
                <Button leftSection={<IconPlus size={18}/>}>
                    Registrar Movimiento
                </Button>
            </Group>

            {/* Stats */}
            <MovementStatsGroup data={mockMovementStats}/>

            {/* Filtros */}
            <Paper p="md" shadow="xs" radius="md" withBorder>
                <Group>
                    <TextInput
                        placeholder="Buscar por activo, responsable o ID..."
                        leftSection={<IconSearch size={16}/>}
                        style={{flex: 1}}
                        value={search}
                        onChange={(e) => setSearch(e.currentTarget.value)}
                    />
                    <Select
                        placeholder="Tipo de Movimiento"
                        leftSection={<IconFilter size={16}/>}
                        data={['Reasignación', 'Préstamo', 'Mantenimiento', 'Baja']}
                        value={typeFilter}
                        onChange={setTypeFilter}
                        clearable
                        style={{width: 200}}
                    />
                </Group>
            </Paper>

            {/* Tabla */}
            <Paper shadow="xs" radius="md" withBorder>
                <MovementTable data={movements}/>
            </Paper>
        </Stack>
    );
}