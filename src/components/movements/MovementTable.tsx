import {Table, Badge, Text, Group, ThemeIcon, rem} from '@mantine/core';
import {IconArrowRight, IconUser} from '@tabler/icons-react';
import type {Movement} from '../../types/movement';

interface MovementTableProps {
    data: Movement[];
}

export function MovementTable({data}: MovementTableProps) {
    const getTypeColor = (tipo: string) => {
        const map: Record<string, string> = {
            'Reasignación': 'brand',
            'Préstamo': 'grape',
            'Mantenimiento': 'yellow',
            'Baja': 'red'
        };
        return map[tipo] || 'gray';
    };

    const rows = data.map((item) => (
        <Table.Tr key={item.id}>
            <Table.Td>
                <Text size="sm" fw={500}>{item.fecha.toLocaleDateString()}</Text>
                <Text size="xs" c="dimmed">{item.fecha.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                })}</Text>
            </Table.Td>

            <Table.Td>
                <Text size="sm" fw={500}>{item.itemNombre}</Text>
                <Badge size="xs" variant="outline">{item.itemId}</Badge>
            </Table.Td>

            <Table.Td>
                <Badge color={getTypeColor(item.tipo)} variant="light">
                    {item.tipo}
                </Badge>
            </Table.Td>

            <Table.Td>
                <Group gap="xs" wrap="nowrap">
                    <div style={{maxWidth: 120}}>
                        <Text size="xs" fw={700}>{item.origen.laboratorio}</Text>
                        <Text size="xs" c="dimmed" truncate>{item.origen.campus}</Text>
                    </div>
                    <ThemeIcon variant="transparent" c="dimmed">
                        <IconArrowRight style={{width: rem(14)}}/>
                    </ThemeIcon>
                    {item.destino ? (
                        <div style={{maxWidth: 120}}>
                            <Text size="xs" fw={700}>{item.destino.laboratorio}</Text>
                            <Text size="xs" c="dimmed" truncate>{item.destino.campus}</Text>
                        </div>
                    ) : (
                        <Text size="xs" c="red" fw={500}>Fuera de inventario</Text>
                    )}
                </Group>
            </Table.Td>

            <Table.Td>
                <Group gap={6}>
                    <IconUser size={14} style={{opacity: 0.5}}/>
                    <Text size="sm">{item.responsable}</Text>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="sm" striped highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Fecha</Table.Th>
                        <Table.Th>Activo</Table.Th>
                        <Table.Th>Tipo</Table.Th>
                        <Table.Th>Trayectoria (Origen → Destino)</Table.Th>
                        <Table.Th>Responsable</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {rows.length > 0 ? rows : (
                        <Table.Tr>
                            <Table.Td colSpan={5}>
                                <Text ta="center" c="dimmed" py="md">No hay movimientos registrados</Text>
                            </Table.Td>
                        </Table.Tr>
                    )}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
}