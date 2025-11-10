import {useMemo} from 'react';
import {
    TextInput,
    Select,
    NumberInput,
    Button,
    Group,
    Stack,
    Grid,
    LoadingOverlay
} from '@mantine/core';
import {useForm} from '@mantine/form';
import type {InventoryItem, ItemCategory, ItemStatus, LabType} from "../../types/inventory.ts";
import {DatePicker} from "@mantine/dates";

interface ItemFormProps {
    item: InventoryItem | null;
    onSubmit: (data: InventoryItem) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

// Opciones estáticas para los selects
const STATUS_OPTIONS: { value: ItemStatus; label: string }[] = [
    {value: 'Operativo', label: 'Operativo'},
    {value: 'En Mantenimiento', label: 'En Mantenimiento'},
    {value: 'De Baja', label: 'De Baja'},
    {value: 'En Préstamo', label: 'En Préstamo'},
];

const CATEGORY_OPTIONS: { value: ItemCategory; label: string }[] = [
    {value: 'Cómputo', label: 'Cómputo'},
    {value: 'Mobiliario', label: 'Mobiliario'},
    {value: 'Electrónica', label: 'Electrónica'},
    {value: 'Redes', label: 'Redes'},
    {value: 'Química', label: 'Química'},
    {value: 'Diseño', label: 'Diseño'},
];

const LAB_TYPE_OPTIONS: { value: LabType; label: string }[] = [
    {value: 'Laboratorio de Cómputo', label: 'Laboratorio de Cómputo'},
    {value: 'Laboratorio de Redes', label: 'Laboratorio de Redes'},
    {value: 'Laboratorio de Química', label: 'Laboratorio de Química'},
    {value: 'Laboratorio de Diseño', label: 'Laboratorio de Diseño'},
    {value: 'Laboratorio de Electrónica', label: 'Laboratorio de Electrónica'},
];

// Esto podría venir de props o de un contexto global
const CAMPUS_OPTIONS = [
    {value: 'Campus Central', label: 'Campus Central'},
    {value: 'Campus Norte', label: 'Campus Norte'},
    {value: 'Campus Sur', label: 'Campus Sur'},
];

export function ItemForm(
    {
        item,
        onSubmit,
        onCancel,
        isLoading = false
    }: ItemFormProps
) {
    const form = useForm<InventoryItem>({
        initialValues: {
            id: item?.id || '',
            nombre: item?.nombre || '',
            categoria: item?.categoria || 'Cómputo',
            estado: item?.estado || 'Operativo',
            campus: item?.campus || '',
            edificio: item?.edificio || '',
            laboratorio: item?.laboratorio || '',
            tipoDeLab: item?.tipoDeLab || 'Laboratorio de Cómputo',
            fechaAdquisicion: item?.fechaAdquisicion,
            ultimoMantenimiento: item?.ultimoMantenimiento,
            proveedor: item?.proveedor || '',
            costo: item?.costo,
        },

        validate: {
            nombre: (value) => (!value ? 'El nombre es requerido' : null),
            categoria: (value) => (!value ? 'La categoría es requerida' : null),
            estado: (value) => (!value ? 'El estado es requerido' : null),
            campus: (value) => (!value ? 'El campus es requerido' : null),
            edificio: (value) => (!value ? 'El edificio es requerido' : null),
            laboratorio: (value) => (!value ? 'El laboratorio es requerido' : null),
            tipoDeLab: (value) => (!value ? 'El tipo de laboratorio es requerido' : null),
        },
    });

    const edificioOptions = useMemo(() => {
        const campus = form.values.campus;
        if (!campus) return [];

        // Esto vendrá del backend
        // Por ahora usamos datos mock
        const edificiosPorCampus: Record<string, { value: string; label: string }[]> = {
            'Campus Central': [
                {value: 'Edificio A', label: 'Edificio A'},
                {value: 'Edificio B', label: 'Edificio B'},
                {value: 'Edificio C', label: 'Edificio C'},
            ],
            'Campus Norte': [
                {value: 'Edificio D', label: 'Edificio D'},
                {value: 'Edificio E', label: 'Edificio E'},
            ],
            'Campus Sur': [
                {value: 'Edificio F', label: 'Edificio F'},
                {value: 'Edificio G', label: 'Edificio G'},
            ],
        };

        return edificiosPorCampus[campus] || [];
    }, [form.values.campus]);

    const handleSubmit = (values: typeof form.values) => {
        onSubmit(values as InventoryItem);
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <LoadingOverlay visible={isLoading}/>

            <Stack gap="md">
                <Grid>
                    <Grid.Col span={{base: 12, sm: 6}}>
                        <TextInput
                            label="Nombre del Equipo"
                            placeholder="Ej: Computadora Dell Optiplex"
                            required
                            {...form.getInputProps('nombre')}
                        />
                    </Grid.Col>

                    <Grid.Col span={{base: 12, sm: 6}}>
                        <Select
                            label="Categoría"
                            placeholder="Selecciona una categoría"
                            required
                            data={CATEGORY_OPTIONS}
                            {...form.getInputProps('categoria')}
                        />
                    </Grid.Col>

                    <Grid.Col span={{base: 12, sm: 6}}>
                        <Select
                            label="Estado"
                            placeholder="Selecciona un estado"
                            required
                            data={STATUS_OPTIONS}
                            {...form.getInputProps('estado')}
                        />
                    </Grid.Col>
                </Grid>

                <Grid>
                    <Grid.Col span={{base: 12, sm: 6}}>
                        <Select
                            label="Campus"
                            placeholder="Selecciona un campus"
                            required
                            data={CAMPUS_OPTIONS}
                            {...form.getInputProps('campus')}
                        />
                    </Grid.Col>

                    <Grid.Col span={{base: 12, sm: 6}}>
                        <Select
                            label="Edificio"
                            placeholder="Selecciona un edificio"
                            required
                            data={edificioOptions}
                            disabled={!form.values.campus}
                            {...form.getInputProps('edificio')}
                        />
                    </Grid.Col>

                    <Grid.Col span={{base: 12, sm: 6}}>
                        <TextInput
                            label="Laboratorio"
                            placeholder="Ej: Lab de Computación 1"
                            required
                            {...form.getInputProps('laboratorio')}
                        />
                    </Grid.Col>

                    <Grid.Col span={{base: 12, sm: 6}}>
                        <Select
                            label="Tipo de Laboratorio"
                            placeholder="Selecciona un tipo"
                            required
                            data={LAB_TYPE_OPTIONS}
                            {...form.getInputProps('tipoDeLab')}
                        />
                    </Grid.Col>
                </Grid>

                <Grid>
                    <Grid.Col span={{base: 12, sm: 6}}>
                        <DatePicker
                            value={form.values.fechaAdquisicion ? new Date(form.values.fechaAdquisicion) : null}
                            onChange={(date) => {
                                if (date === null) form.setFieldValue('fechaAdquisicion', undefined);
                                else form.setFieldValue('fechaAdquisicion', date as Date);
                            }}
                        />
                    </Grid.Col>

                    <Grid.Col span={{base: 12, sm: 6}}>
                        <DatePicker
                            value={form.values.fechaAdquisicion ? new Date(form.values.fechaAdquisicion) : null}
                            onChange={(date) => {
                                if (date === null) form.setFieldValue('fechaAdquisicion', undefined);
                                else form.setFieldValue('fechaAdquisicion', date as Date);
                            }}
                        /> </Grid.Col>

                    <Grid.Col span={{base: 12, sm: 6}}>
                        <TextInput
                            label="Proveedor"
                            placeholder="Ej: Dell Technologies"
                            {...form.getInputProps('proveedor')}
                        />
                    </Grid.Col>

                    <Grid.Col span={{base: 12, sm: 6}}>
                        <NumberInput
                            label="Costo (USD)"
                            placeholder="0.00"
                            min={0}
                            {...form.getInputProps('costo')}
                        />
                    </Grid.Col>
                </Grid>

                <Group justify="flex-end" mt="xl">
                    <Button variant="outline" onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button type="submit" loading={isLoading}>
                        {item ? 'Actualizar' : 'Crear'} Elemento
                    </Button>
                </Group>
            </Stack>
        </form>
    );
}