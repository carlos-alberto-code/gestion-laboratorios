import {useEffect, useMemo, useState} from 'react';
import {
    Button,
    Group,
    Stack,
    Select,
    TextInput,
    Textarea,
    Divider,
    Grid,
    Text,
    Paper,
    LoadingOverlay
} from '@mantine/core';
import {useForm} from '@mantine/form';
import {DatePickerInput} from '@mantine/dates';
import {
    IconDeviceDesktop,
    IconMapPin,
    IconUser,
    IconArrowRight,
    IconCalendar
} from '@tabler/icons-react';

// Tipos y Datos
import type {MovementType} from '../../types/movement';
import type {InventoryItem} from '../../types/inventory';
import {mockInventory} from '../../mocks/inventory'; // Importamos para simular búsqueda real

interface MovementFormProps {
    onSubmit: (values: any) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

const MOVEMENT_TYPES: { value: MovementType; label: string }[] = [
    {value: 'Reasignación', label: 'Reasignación (Cambio permanente)'},
    {value: 'Préstamo', label: 'Préstamo (Temporal)'},
    {value: 'Mantenimiento', label: 'Mantenimiento (Reparación)'},
    {value: 'Baja', label: 'Dar de Baja (Retiro)'},
];

// Opciones Mockeadas (Igual que en ItemForm)
const CAMPUS_OPTIONS = ['Campus Central', 'Campus Norte', 'Campus Sur'];

export function MovementForm({onSubmit, onCancel, isLoading = false}: MovementFormProps) {
    // Estado local para mostrar info del ítem seleccionado
    const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

    const form = useForm({
        initialValues: {
            itemId: '',
            tipo: '' as MovementType | '',
            fecha: new Date(),
            responsable: '',
            motivo: '',
            // Destino (puede quedar vacío si es Baja)
            destinoCampus: '',
            destinoEdificio: '',
            destinoLaboratorio: '',
        },

        validate: {
            itemId: (value) => (!value ? 'Debes seleccionar un activo' : null),
            tipo: (value) => (!value ? 'El tipo de movimiento es requerido' : null),
            responsable: (value) => (!value ? 'El responsable es requerido' : null),
            fecha: (value) => (!value ? 'La fecha es requerida' : null),
            // Validación condicional: Si NO es Baja, requiere destino
            destinoCampus: (value, values) =>
                (values.tipo !== 'Baja' && !value) ? 'Requerido para traslado' : null,
            destinoEdificio: (value, values) =>
                (values.tipo !== 'Baja' && !value) ? 'Requerido' : null,
            destinoLaboratorio: (value, values) =>
                (values.tipo !== 'Baja' && !value) ? 'Requerido' : null,
        },
    });

    // Efecto: Cuando cambia el ID del item, buscamos sus detalles para mostrar el Origen
    useEffect(() => {
        if (form.values.itemId) {
            const item = mockInventory.find(i => i.id === form.values.itemId);
            setSelectedItem(item || null);
        } else {
            setSelectedItem(null);
        }
    }, [form.values.itemId]);

    // Opciones dinámicas para Item (ID + Nombre)
    const itemOptions = useMemo(() =>
            mockInventory.map(item => ({
                value: item.id,
                label: `${item.nombre} (${item.id})`
            })),
        []);

    // Opciones dinámicas de Edificio (Mock)
    const edificioOptions = useMemo(() => {
        if (!form.values.destinoCampus) return [];
        const map: Record<string, string[]> = {
            'Campus Central': ['Edificio A', 'Edificio B', 'Ciencias'],
            'Campus Norte': ['Edificio Redes', 'FabLab'],
            'Campus Sur': ['Ciencias', 'Ingeniería'],
        };
        return map[form.values.destinoCampus] || [];
    }, [form.values.destinoCampus]);

    const handleSubmit = (values: typeof form.values) => {
        if (!selectedItem) return;

        // Construimos el objeto payload transformando los datos planos del form
        // a la estructura anidada que espera el backend (LocationSnapshot)
        const payload = {
            itemId: values.itemId,
            itemNombre: selectedItem.nombre, // Desnormalización
            tipo: values.tipo,
            fecha: values.fecha,
            responsable: values.responsable,
            motivo: values.motivo,
            // Snapshot del Origen (tal cual está el item HOY)
            origen: {
                campus: selectedItem.campus,
                edificio: selectedItem.edificio,
                laboratorio: selectedItem.laboratorio
            },
            // Snapshot del Destino (Null si es Baja)
            destino: values.tipo === 'Baja' ? null : {
                campus: values.destinoCampus,
                edificio: values.destinoEdificio,
                laboratorio: values.destinoLaboratorio
            }
        };

        onSubmit(payload);
    };

    const isBaja = form.values.tipo === 'Baja';

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <LoadingOverlay visible={isLoading}/>

            <Stack gap="md">
                {/* 1. Selección del Activo */}
                <Paper withBorder p="sm" bg="gray.0">
                    <Group align="flex-start">
                        <Select
                            label="Seleccionar Activo"
                            placeholder="Buscar por ID o Nombre"
                            data={itemOptions}
                            searchable
                            required
                            leftSection={<IconDeviceDesktop size={16}/>}
                            style={{flex: 1}}
                            {...form.getInputProps('itemId')}
                        />
                        {selectedItem && (
                            <Stack gap={2} mt={2}>
                                <Text size="xs" fw={700} c="dimmed">UBICACIÓN ACTUAL (ORIGEN)</Text>
                                <Text size="sm">{selectedItem.campus} • {selectedItem.edificio}</Text>
                                <Text size="xs">{selectedItem.laboratorio}</Text>
                            </Stack>
                        )}
                    </Group>
                </Paper>

                <Grid>
                    {/* 2. Detalles del Movimiento */}
                    <Grid.Col span={6}>
                        <Select
                            label="Tipo de Movimiento"
                            placeholder="Selecciona acción"
                            data={MOVEMENT_TYPES}
                            required
                            {...form.getInputProps('tipo')}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <DatePickerInput
                            label="Fecha del Movimiento"
                            leftSection={<IconCalendar size={16}/>}
                            required
                            {...form.getInputProps('fecha')}
                        />
                    </Grid.Col>

                    {/* 3. Destino (Condicional) */}
                    {!isBaja && (
                        <Grid.Col span={12}>
                            <Divider labelPosition="center" label={
                                <Group gap={5}>
                                    <IconArrowRight size={14}/>
                                    <Text size="xs" fw={500}>NUEVA UBICACIÓN (DESTINO)</Text>
                                </Group>
                            } my="xs"/>

                            <Grid>
                                <Grid.Col span={4}>
                                    <Select
                                        label="Campus Destino"
                                        placeholder="Campus"
                                        data={CAMPUS_OPTIONS}
                                        required
                                        leftSection={<IconMapPin size={16}/>}
                                        {...form.getInputProps('destinoCampus')}
                                    />
                                </Grid.Col>
                                <Grid.Col span={4}>
                                    <Select
                                        label="Edificio"
                                        placeholder="Edificio"
                                        data={edificioOptions}
                                        disabled={!form.values.destinoCampus}
                                        required
                                        {...form.getInputProps('destinoEdificio')}
                                    />
                                </Grid.Col>
                                <Grid.Col span={4}>
                                    <TextInput
                                        label="Laboratorio / Sala"
                                        placeholder="Ej: Lab 102"
                                        required
                                        {...form.getInputProps('destinoLaboratorio')}
                                    />
                                </Grid.Col>
                            </Grid>
                        </Grid.Col>
                    )}

                    <Grid.Col span={12}>
                        <Divider my="xs"/>
                    </Grid.Col>

                    {/* 4. Responsable y Motivo */}
                    <Grid.Col span={12}>
                        <TextInput
                            label="Responsable"
                            description="Persona que autoriza o recibe el activo"
                            placeholder="Nombre del profesor o administrativo"
                            leftSection={<IconUser size={16}/>}
                            required
                            {...form.getInputProps('responsable')}
                        />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Textarea
                            label="Motivo / Observaciones"
                            placeholder="Explica la razón del movimiento..."
                            minRows={2}
                            {...form.getInputProps('motivo')}
                        />
                    </Grid.Col>
                </Grid>

                <Group justify="flex-end" mt="lg">
                    <Button variant="default" onClick={onCancel}>Cancelar</Button>
                    <Button type="submit" color={isBaja ? 'red' : 'brand'}>
                        {isBaja ? 'Confirmar Baja' : 'Registrar Movimiento'}
                    </Button>
                </Group>
            </Stack>
        </form>
    );
}