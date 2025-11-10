import {Table, Badge, Text, ActionIcon, Menu, rem} from '@mantine/core';
import {IconDots, IconEdit, IconTrash} from '@tabler/icons-react';
import type {InventoryItem} from "../../types/inventory.ts";

interface InventoryTableProps {
    data: InventoryItem[];
    scrollable?: boolean;
    onEdit?: (item: InventoryItem) => void;
    onDelete?: (item: InventoryItem) => void;
}

export function InventoryTable({data, scrollable = true, onEdit, onDelete}: InventoryTableProps) {

    const getStatusColor = (estado: string) => {
        const colors: Record<string, string> = {
            'Operativo': 'green',
            'En Mantenimiento': 'yellow',
            'De Baja': 'red',
            'En Préstamo': 'blue'
        };
        return colors[estado] || 'gray';
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
            <Table.Td>
                <Menu position="bottom-end" withArrow>
                    <Menu.Target>
                        <ActionIcon variant="subtle" color="gray">
                            <IconDots style={{width: rem(16), height: rem(16)}}/>
                        </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Item
                            leftSection={<IconEdit style={{width: rem(16), height: rem(16)}}/>}
                            onClick={() => onEdit?.(item)}
                        >
                            Editar elemento
                        </Menu.Item>

                        <Menu.Divider/>

                        <Menu.Item
                            leftSection={<IconTrash style={{width: rem(16), height: rem(16)}}/>}
                            color="red"
                            onClick={() => onDelete?.(item)}
                        >
                            Eliminar elemento
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
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
                    <Table.Th style={{width: rem(60)}}>Acciones</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {rows.length > 0 ? rows : (
                    <Table.Tr>
                        <Table.Td colSpan={6} style={{textAlign: 'center'}}>
                            <Text c="dimmed" py="md">No se encontraron resultados</Text>
                        </Table.Td>
                    </Table.Tr>
                )}
            </Table.Tbody>
        </Table>
    );

    if (scrollable) {
        return (
            <Table.ScrollContainer minWidth={650} type="native">
                {tableContent}
            </Table.ScrollContainer>
        );
    }

    return tableContent;
}