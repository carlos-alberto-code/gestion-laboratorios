import {useMemo, useState} from "react";
import mockInventory from "../mocks/inventory.ts";
import {Title, Stack, Paper, Grid, Select} from '@mantine/core';
import type {FilterState, InventoryItem, ItemCategory, ItemStatus, LabType} from "../types/inventory.ts";
import {InventoryTable} from "../components/inventory/InventoryTable.tsx";

export function InventoryView() {

    const [data, setData] = useState<InventoryItem[]>(mockInventory);

    const [filters, setFilters] = useState<FilterState>({
        campus: null,
        edificio: null,
        tipoDeLab: null,
        categoria: null,
        estado: null,
    });

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

    // --- Filtro dependiente: Edificios ---
    // (Este se recalcula si 'filters.campus' cambia)
    const edificioOptions = useMemo(() => {
        if (!filters.campus) {
            return []; // No mostrar edificios si no hay campus seleccionado
        }
        const edificiosEnCampus = data
            .filter(item => item.campus === filters.campus)
            .map(item => item.edificio);

        return Array.from(new Set(edificiosEnCampus))
            .map(edificio => ({value: edificio, label: edificio}));
    }, [data, filters.campus]);


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

    // Función genérica para manejar cambios en los Selects ---
    const handleSelectChange = (field: keyof FilterState, value: string | null) => {
        setFilters(currentFilters => ({
            ...currentFilters,
            [field]: value,
            // Si el campus cambia, resetea el edificio
            ...(field === 'campus' && {edificio: null}),
        }));
    };

    return (
        <Stack gap="md">
            <Title order={2}>Inventario General</Title>

            {/* --- Panel de Filtros --- */}
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

            <Paper shadow="sm" p="md" withBorder>
                <InventoryTable data={filteredItems}/>
            </Paper>

        </Stack>
    );
}