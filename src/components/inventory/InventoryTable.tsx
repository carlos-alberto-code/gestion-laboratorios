import {Table, Badge, Text} from '@mantine/core';
import type {InventoryItem} from "../../types/inventory.ts";

interface InventoryTableProps {
    data: InventoryItem[];
    scrollable?: boolean;
}

export function InventoryTable({data, scrollable = true}: InventoryTableProps) {
    const getStatusColor = (estado: string) => {
        const colors: Record<string, string> = {
            'Operativo': 'green',
            'Mantenimiento': 'yellow',
            'Dañado': 'red',
            'Retirado': 'gray'
        };
        return colors[estado] || 'blue';
    };

    const rows = data.map((item) => (
        <Table.Tr key={item.id}>
            <Table.Td>
                <Text size="sm" fw={500}>{item.nombre}</Text>
                <Text size="xs" c="dimmed">{item.id}</Text>
            </Table.Td>
            <Table.Td>
                <Badge size="sm" variant="light">
                    {item.categoria}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Badge size="sm" color={getStatusColor(item.estado)}>
                    {item.estado}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Text size="sm">{item.campus}</Text>
                <Text size="xs" c="dimmed">{item.edificio}</Text>
            </Table.Td>
            <Table.Td>
                <Badge size="sm" variant="outline">
                    {item.tipoDeLab}
                </Badge>
            </Table.Td>
        </Table.Tr>
    ));

    const tableContent = (
        <Table
            striped
            withTableBorder
            verticalSpacing="xs"
        >
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Equipo</Table.Th>
                    <Table.Th>Categoría</Table.Th>
                    <Table.Th>Estado</Table.Th>
                    <Table.Th>Ubicación</Table.Th>
                    <Table.Th>Tipo Lab</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {rows.length > 0 ? rows : (
                    <Table.Tr>
                        <Table.Td colSpan={5} style={{textAlign: 'center'}}>
                            <Text c="dimmed" py="md">No se encontraron resultados</Text>
                        </Table.Td>
                    </Table.Tr>
                )}
            </Table.Tbody>
        </Table>
    );

    if (scrollable) {
        return (
            <Table.ScrollContainer minWidth={600}>
                {tableContent}
            </Table.ScrollContainer>
        );
    }

    return tableContent;
}