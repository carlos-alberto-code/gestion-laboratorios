import {useMemo, useEffect} from 'react';
import {Button, Group, Stack, TextInput, Select, Grid} from '@mantine/core';
import {useForm} from '@mantine/form';
import {DatePickerInput, TimeInput} from '@mantine/dates';
import {IconCalendar, IconClock, IconUser, IconDeviceDesktop} from '@tabler/icons-react';
import type {Booking} from '../../types/booking';
import type {LabType} from '../../types/inventory';

interface BookingFormProps {
    initialData?: Booking | null;
    onSubmit: (values: Omit<Booking, 'id' | 'laboratorioNombre' | 'estado'>) => void;
    onCancel: () => void;
}

const CAMPUS_OPTIONS = ['Campus Central', 'Campus Norte', 'Campus Sur'];
const LAB_TYPE_OPTIONS: LabType[] = [
    'Laboratorio de Cómputo',
    'Laboratorio de Redes',
    'Laboratorio de Química',
    'Laboratorio de Diseño',
    'Laboratorio de Electrónica'
];

export function BookingForm({onSubmit, onCancel, initialData}: BookingFormProps) {
    const form = useForm({
        initialValues: {
            asunto: initialData?.asunto || '',
            solicitante: initialData?.solicitante || '',
            campus: '',
            edificio: '',
            tipoDeLab: initialData?.tipoDeLab || '' as LabType | '',
            laboratorioId: initialData?.laboratorioId || '',
            fecha: initialData?.fecha ? new Date(initialData.fecha) : new Date(),
            horaInicio: initialData?.horaInicio || '',
            horaFin: initialData?.horaFin || '',
        },
        validate: {
            asunto: (value) => (value.length < 3 ? 'El asunto es muy corto' : null),
            solicitante: (value) => (!value ? 'El solicitante es requerido' : null),
            campus: (value) => (!value ? 'Selecciona un campus' : null),
            edificio: (value) => (!value ? 'Selecciona un edificio' : null),
            tipoDeLab: (value) => (!value ? 'Selecciona un tipo de laboratorio' : null),
            fecha: (value) => (!value ? 'Selecciona una fecha' : null),
            horaInicio: (value) => (!value ? 'La hora de inicio es requerida' : null),
            horaFin: (value) => (!value ? 'La hora de fin es requerida' : null),
        },
    });

    useEffect(() => {
        if (initialData) {
            form.setValues({
                asunto: initialData.asunto,
                solicitante: initialData.solicitante,
                campus: 'Campus Central',
                edificio: 'Edificio A',
                tipoDeLab: initialData.tipoDeLab,
                laboratorioId: initialData.laboratorioId,
                fecha: new Date(initialData.fecha),
                horaInicio: initialData.horaInicio,
                horaFin: initialData.horaFin,
            });
        } else {
            form.reset();
        }
    }, [initialData]);

    const edificioOptions = useMemo(() => {
        if (!form.values.campus) return [];
        const map: Record<string, string[]> = {
            'Campus Central': ['Edificio A', 'Edificio B', 'Ciencias'],
            'Campus Norte': ['Edificio Redes', 'FabLab'],
            'Campus Sur': ['Ciencias', 'Ingeniería'],
        };
        return map[form.values.campus] || [];
    }, [form.values.campus]);

    const laboratorioOptions = useMemo(() => {
        if (!form.values.edificio || !form.values.tipoDeLab) return [];
        return [
            {value: 'LAB-101', label: `Lab 101 (${form.values.tipoDeLab})`},
            {value: 'LAB-102', label: `Lab 102 (${form.values.tipoDeLab})`},
        ];
    }, [form.values.edificio, form.values.tipoDeLab]);

    const handleSubmit = (values: typeof form.values) => {
        onSubmit({
            ...values,
            tipoDeLab: values.tipoDeLab as LabType,
        });
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
                <Grid>
                    <Grid.Col span={12}>
                        <TextInput
                            label="Asunto / Propósito"
                            placeholder="Ej: Clase de Programación Avanzada"
                            required
                            {...form.getInputProps('asunto')}
                        />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <TextInput
                            label="Solicitante"
                            placeholder="Nombre del profesor o encargado"
                            leftSection={<IconUser size={16}/>}
                            required
                            {...form.getInputProps('solicitante')}
                        />
                    </Grid.Col>
                </Grid>

                <Grid>
                    <Grid.Col span={{base: 12, sm: 6}}>
                        <Select
                            label="Campus"
                            placeholder="Selecciona uno"
                            data={CAMPUS_OPTIONS}
                            {...form.getInputProps('campus')}
                        />
                    </Grid.Col>
                    <Grid.Col span={{base: 12, sm: 6}}>
                        <Select
                            label="Edificio"
                            placeholder={form.values.campus ? "Selecciona uno" : "Elige campus primero"}
                            data={edificioOptions}
                            disabled={!form.values.campus}
                            {...form.getInputProps('edificio')}
                        />
                    </Grid.Col>
                    <Grid.Col span={{base: 12, sm: 6}}>
                        <Select
                            label="Tipo de Laboratorio"
                            placeholder="Categoría"
                            data={LAB_TYPE_OPTIONS}
                            {...form.getInputProps('tipoDeLab')}
                        />
                    </Grid.Col>
                    <Grid.Col span={{base: 12, sm: 6}}>
                        <Select
                            label="Laboratorio Específico"
                            placeholder="Selecciona el espacio"
                            data={laboratorioOptions}
                            disabled={laboratorioOptions.length === 0}
                            leftSection={<IconDeviceDesktop size={16}/>}
                            {...form.getInputProps('laboratorioId')}
                        />
                    </Grid.Col>
                </Grid>

                <Grid>
                    <Grid.Col span={{base: 12, sm: 4}}>
                        <DatePickerInput
                            label="Fecha"
                            placeholder="Selecciona el día"
                            leftSection={<IconCalendar size={16}/>}
                            minDate={new Date()}
                            {...form.getInputProps('fecha')}
                        />
                    </Grid.Col>
                    <Grid.Col span={{base: 6, sm: 4}}>
                        <TimeInput
                            label="Hora Inicio"
                            leftSection={<IconClock size={16}/>}
                            {...form.getInputProps('horaInicio')}
                        />
                    </Grid.Col>
                    <Grid.Col span={{base: 6, sm: 4}}>
                        <TimeInput
                            label="Hora Fin"
                            leftSection={<IconClock size={16}/>}
                            {...form.getInputProps('horaFin')}
                        />
                    </Grid.Col>
                </Grid>

                <Group justify="flex-end" mt="md">
                    <Button variant="default" onClick={onCancel}>Cancelar</Button>
                    <Button type="submit">{initialData ? 'Guardar Cambios' : 'Crear Reservación'}</Button>
                </Group>
            </Stack>
        </form>
    );
}