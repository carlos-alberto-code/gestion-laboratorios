import {useMemo, useState} from "react";
import mockInventory from "../mocks/inventory.ts";
import {
    Title,
    Stack,
    Paper,
    Grid,
    Select,
    Modal,
    Text,
    Button,
    Group
} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {EditModalForm} from "../components/inventory/EditModalForm.tsx";
import {InventoryTable} from "../components/inventory/InventoryTable.tsx";
import type {FilterState, InventoryItem, ItemCategory, ItemStatus, LabType} from "../types/inventory.ts";

export function InventoryView() {

    const [data, setData] = useState<InventoryItem[]>(mockInventory);
    const [filters, setFilters] = useState<FilterState>({
        campus: null,
        edificio: null,
        tipoDeLab: null,
        categoria: null,
        estado: null,
    });

    // Estados para modales
    const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
    const [deletingItem, setDeletingItem] = useState<InventoryItem | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Usar useDisclosure para mejor control del modal
    const [editModalOpened, {open: openEditModal, close: closeEditModal}] = useDisclosure(false);
    const [deleteModalOpened, {open: openDeleteModal, close: closeDeleteModal}] = useDisclosure(false);

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

    // Manejo de edición
    const handleEdit = (item: InventoryItem) => {
        setEditingItem(item);
        openEditModal();
    };

    const handleSaveEdit = async (formData: InventoryItem) => {
        setIsSubmitting(true);
        try {
            // Simular llamada a API
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Actualizar el estado local
            setData(prev =>
                prev.map(item =>
                    item.id === formData.id ? formData : item
                )
            );

            // Cerrar modal
            closeEditModal();
            setEditingItem(null);
        } catch (error) {
            console.error('Error al guardar:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Manejo de eliminación
    const handleDelete = (item: InventoryItem) => {
        setDeletingItem(item);
        openDeleteModal();
    };

    const handleConfirmDelete = async () => {
        if (!deletingItem) return;

        setIsSubmitting(true);
        try {
            // Simular llamada a API
            await new Promise(resolve => setTimeout(resolve, 500));

            setData(prev => prev.filter(item => item.id !== deletingItem.id));
            closeDeleteModal();
            setDeletingItem(null);
        } catch (error) {
            console.error('Error al eliminar:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCloseEditModal = () => {
        closeEditModal();
        setEditingItem(null);
    };

    const handleCloseDeleteModal = () => {
        closeDeleteModal();
        setDeletingItem(null);
    };

    return (
        <Stack gap="md">
            <Title order={2}>Inventario General</Title>

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
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </Paper>

            {/* Modal de Edición */}
            <EditModalForm
                item={editingItem}
                opened={editModalOpened}
                onClose={handleCloseEditModal}
                onSubmit={handleSaveEdit}
                isLoading={isSubmitting}
            />

            {/* Modal de Eliminación */}
            <Modal
                opened={deleteModalOpened}
                onClose={handleCloseDeleteModal}
                title="Confirmar Eliminación"
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
            >
                <Stack>
                    <Text>
                        ¿Estás seguro de que deseas eliminar el elemento{" "}
                        <Text span fw={500}>
                            {deletingItem?.nombre}
                        </Text>
                        ? Esta acción no se puede deshacer.
                    </Text>
                    <Group justify="flex-end">
                        <Button
                            variant="outline"
                            onClick={handleCloseDeleteModal}
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </Button>
                        <Button
                            color="red"
                            onClick={handleConfirmDelete}
                            loading={isSubmitting}
                        >
                            Eliminar
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </Stack>
    );
}