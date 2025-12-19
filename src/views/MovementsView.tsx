import {useState, useEffect, useCallback} from 'react';
import {Title, Text, Stack, Button, Group, TextInput, Paper, Select, LoadingOverlay, Modal} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks'; // <--- Hook para el modal
import {IconPlus, IconSearch, IconFilter} from '@tabler/icons-react';
import {notifications} from '@mantine/notifications';

// Componentes
import {MovementTable} from '../components/movements/MovementTable';
import {MovementStatsGroup} from '../components/movements/MovementStatsGroup';
import {MovementForm} from '../components/movements/MovementForm'; // <--- Tu nuevo componente

// Servicios y Tipos
import {MockMovementService} from '../services/MockMovementService';
import {mockMovementStats} from '../mocks/movements';
import type {Movement, MovementType} from '../types/movement';

const movementService = new MockMovementService();

export function MovementsView() {
    const [movements, setMovements] = useState<Movement[]>([]);
    const [loading, setLoading] = useState(false);

    // Filtros
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState<string | null>(null);

    // Estado del Modal
    const [opened, {open, close}] = useDisclosure(false); // <--- Control del modal

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

    // Manejador para crear movimiento
    const handleRegisterMovement = async (values: any) => {
        setLoading(true);
        try {
            await movementService.registerMovement(values);

            notifications.show({
                title: 'Movimiento Registrado',
                message: 'El inventario ha sido actualizado correctamente',
                color: 'green'
            });

            await loadData(); // Recargar tabla
            close(); // Cerrar modal
        } catch (error) {
            notifications.show({title: 'Error', message: 'No se pudo registrar el movimiento', color: 'red'});
        } finally {
            setLoading(false);
        }
    };

    return (
        <Stack gap="lg" pos="relative">
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{radius: "sm", blur: 2}}/>

            {/* Header */}
            <Group justify="space-between" align="center">
                <div>
                    <Title order={2}>Movimientos e Historial</Title>
                    <Text c="dimmed" size="sm">Trazabilidad de activos entre laboratorios</Text>
                </div>
                <Button leftSection={<IconPlus size={18}/>} onClick={open}>
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

            {/* Modal de Registro */}
            <Modal
                opened={opened}
                onClose={close}
                title="Registrar Nuevo Movimiento"
                size="lg"
                overlayProps={{backgroundOpacity: 0.55, blur: 3}}
            >
                <MovementForm
                    onSubmit={handleRegisterMovement}
                    onCancel={close}
                    isLoading={loading}
                />
            </Modal>
        </Stack>
    );
}