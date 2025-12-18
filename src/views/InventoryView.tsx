import {useMemo, useState} from "react";
import mockInventory from "../mocks/inventory.ts";
import {
    Title,
    Stack,
    Paper,
    Grid,
    Select,
    Modal,
    Group,
    Button,
    Text
} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {notifications} from '@mantine/notifications';
import {InventoryTable} from "../components/inventory/InventoryTable.tsx";
import type {FilterState, InventoryItem, ItemCategory, ItemStatus, LabType} from "../types/inventory.ts";
import {ItemForm} from "../components/inventory/ItemForm.tsx";
import {IconPlus, IconAlertTriangle} from '@tabler/icons-react';

export function InventoryView() {

    const [data, setData] = useState<InventoryItem[]>(mockInventory);
    const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
    const [filters, setFilters] = useState<FilterState>({
        campus: null,
        edificio: null,
        tipoDeLab: null,
        categoria: null,
        estado: null,
    });

    const [openedAddModal, {open: openAddModal, close: closeAddModal}] = useDisclosure(false);
    const [openedEditModal, {open: openEditModal, close: closeEditModal}] = useDisclosure(false);
    const [openedDeleteModal, {open: openDeleteModal, close: closeDeleteModal}] = useDisclosure(false);

    const onEdit = (item: InventoryItem) => {
        setSelectedItem(item);
        openEditModal();
    }

    const onAdd = () => {
        setSelectedItem(null);
        openAddModal();
    }

    const onDelete = (item: InventoryItem) => {
        setSelectedItem(item);
        openDeleteModal();
    }

    const handleSubmitEdit = (updatedItem: InventoryItem) => {
        setData(currentData =>
            currentData.map(item =>
                item.id === updatedItem.id ? updatedItem : item)
        );
        closeEditModal();
        setSelectedItem(null);
        // TODO: Actualizar en base de datos

        notifications.show({
            title: '¡Éxito!',
            message: 'El elemento ha sido actualizado correctamente',
            color: 'green',
        });
    }

    const handleSubmitAdd = (newItem: InventoryItem) => {
        // Generar ID temporal
        const itemWithId = {
            ...newItem,
            id: `ITEM-${Date.now()}`,
        };

        setData(currentData => [...currentData, itemWithId]);
        closeAddModal();
        setSelectedItem(null);
        // TODO: Crear en base de datos

        notifications.show({
            title: '¡Éxito!',
            message: 'El elemento ha sido creado correctamente',
            color: 'green',
        });
    }

    const handleSubmitDelete = () => {
        if (selectedItem) {
            setData(currentData =>
                currentData.filter(item => item.id !== selectedItem.id)
            );
            closeDeleteModal();
            setSelectedItem(null);
            // TODO: Eliminar en base de datos

            notifications.show({
                title: 'Elemento eliminado',
                message: 'El elemento ha sido eliminado correctamente',
                color: 'red',
            });
        }
    }


    // Opciones para filtros
    const campusOptions = useMemo(() =>
            Array.from(new Set(data.map(item => item.campus)))
                .map(campus => ({value: campus, label: campus})),
        [data]
    );

    const tipoDeLabOptions = useMemo(() =>
            Array.from(new Set(data.map(item => item.tipoDeLab)))
                .map(tipo => ({value: tipo, label: tipo})),
        [data]
    );

    const categoriaOptions = useMemo(() =>
            Array.from(new Set(data.map(item => item.categoria)))
                .map(cat => ({value: cat, label: cat})),
        [data]
    );

    const estadoOptions = useMemo(() =>
            Array.from(new Set(data.map(item => item.estado)))
                .map(est => ({value: est, label: est})),
        [data]
    );

    const edificioOptions = useMemo(() => {
        if (!filters.campus) {
            return [];
        }
        const edificiosEnCampus = data
            .filter(item => item.campus === filters.campus)
            .map(item => item.edificio);

        return Array.from(new Set(edificiosEnCampus))
            .map(edificio => ({value: edificio, label: edificio}));
    }, [data, filters.campus]);

    // Filtrado de items
    const filteredItems = useMemo(() => {
        let items = data;

        if (filters.campus) {
            items = items.filter(item => item.campus === filters.campus);
        }
        if (filters.edificio) {
            items = items.filter(item => item.edificio === filters.edificio);
        }
        if (filters.tipoDeLab) {
            items = items.filter(item => item.tipoDeLab === filters.tipoDeLab);
        }
        if (filters.categoria) {
            items = items.filter(item => item.categoria === filters.categoria);
        }
        if (filters.estado) {
            items = items.filter(item => item.estado === filters.estado);
        }

        return items;
    }, [filters, data]);

    const handleSelectChange = (field: keyof FilterState, value: string | null) => {
        setFilters(currentFilters => ({
            ...currentFilters,
            [field]: value,
            ...(field === 'campus' && {edificio: null}),
        }));
    };

    return (
        <Stack gap="md">
            <Group justify="space-between" align="center">
                <Group align="center">
                    <Title order={2}>Inventario</Title>
                </Group>
                <Button
                    leftSection={<IconPlus size={16}/>}
                    onClick={onAdd}
                >
                    Agregar Nuevo Elemento
                </Button>
            </Group>

            {/* Panel de Filtros */}
            <Paper shadow="sm" p="md" withBorder>
                <Grid>
                    <Grid.Col span={{base: 12, sm: 6, md: 4}}>
                        <Select
                            label="Campus"
                            placeholder="Todos los campus"
                            data={campusOptions}
                            value={filters.campus}
                            onChange={value => handleSelectChange('campus', value)}
                            clearable
                        />
                    </Grid.Col>

                    <Grid.Col span={{base: 12, sm: 6, md: 4}}>
                        <Select
                            label="Edificio"
                            placeholder={filters.campus ? "Todos los edificios" : "Selecciona un campus"}
                            data={edificioOptions}
                            value={filters.edificio}
                            onChange={value => handleSelectChange('edificio', value)}
                            disabled={!filters.campus}
                            clearable
                        />
                    </Grid.Col>

                    <Grid.Col span={{base: 12, sm: 6, md: 4}}>
                        <Select
                            label="Tipo de Laboratorio"
                            placeholder="Todos los tipos"
                            data={tipoDeLabOptions}
                            value={filters.tipoDeLab}
                            onChange={value => handleSelectChange('tipoDeLab', value as LabType)}
                            clearable
                        />
                    </Grid.Col>

                    <Grid.Col span={{base: 12, sm: 6, md: 4}}>
                        <Select
                            label="Categoría del Ítem"
                            placeholder="Todas las categorías"
                            data={categoriaOptions}
                            value={filters.categoria}
                            onChange={value => handleSelectChange('categoria', value as ItemCategory)}
                            clearable
                        />
                    </Grid.Col>

                    <Grid.Col span={{base: 12, sm: 6, md: 4}}>
                        <Select
                            label="Estado del Ítem"
                            placeholder="Todos los estados"
                            data={estadoOptions}
                            value={filters.estado}
                            onChange={value => handleSelectChange('estado', value as ItemStatus)}
                            clearable
                        />
                    </Grid.Col>
                </Grid>
            </Paper>

            {/* Tabla de resultados */}
            <Paper shadow="sm" withBorder>
                <InventoryTable
                    data={filteredItems}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            </Paper>

            {/* Modal de Agregar */}
            <Modal
                opened={openedAddModal}
                onClose={closeAddModal}
                title="Agregar Nuevo Elemento"
                size="xl"
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
            >
                <ItemForm
                    item={null}
                    onSubmit={handleSubmitAdd}
                    onCancel={closeAddModal}
                />
            </Modal>

            {/* Modal de Edición */}
            <Modal
                opened={openedEditModal}
                onClose={closeEditModal}
                title="Editar Elemento"
                size="xl"
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
            >
                <ItemForm
                    item={selectedItem}
                    onSubmit={handleSubmitEdit}
                    onCancel={closeEditModal}
                />
            </Modal>

            {/* Modal de Eliminación */}
            <Modal
                opened={openedDeleteModal}
                onClose={closeDeleteModal}
                title="Confirmar Eliminación"
                centered
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
            >
                <Stack gap="md">
                    <Group gap="sm">
                        <IconAlertTriangle size={24} color="var(--mantine-color-red-6)"/>
                        <Text size="sm" fw={500}>
                            Esta acción no se puede deshacer
                        </Text>
                    </Group>

                    {selectedItem && (
                        <Paper p="sm" withBorder bg="gray.0">
                            <Text size="sm" fw={500} mb={4}>
                                {selectedItem.nombre}
                            </Text>
                            <Text size="xs" c="dimmed">
                                ID: {selectedItem.id}
                            </Text>
                            <Text size="xs" c="dimmed">
                                Ubicación: {selectedItem.campus} - {selectedItem.edificio} - {selectedItem.laboratorio}
                            </Text>
                        </Paper>
                    )}

                    <Text size="sm" c="dimmed">
                        ¿Estás seguro de que deseas eliminar este elemento del inventario?
                    </Text>

                    <Group justify="flex-end" mt="md">
                        <Button variant="outline" onClick={closeDeleteModal}>
                            Cancelar
                        </Button>
                        <Button color="red" onClick={handleSubmitDelete}>
                            Eliminar Elemento
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </Stack>
    );
}

