import {Table, Badge, Text, Group, Avatar, ActionIcon, Menu, rem} from '@mantine/core';
import {IconDots, IconEye, IconEdit, IconTrash} from '@tabler/icons-react';
import type {Booking} from '../../types/booking';

interface BookingTableProps {
    data: Booking[];
    onEdit: (item: Booking) => void;
    onDelete: (item: Booking) => void;
}

export function BookingTable({data, onEdit, onDelete}: BookingTableProps) {
    const getStatusColor = (estado: string) => {
        switch (estado) {
            case 'Confirmada':
                return 'green';
            case 'En Curso':
                return 'blue';
            case 'Pendiente':
                return 'orange';
            case 'Finalizada':
                return 'gray';
            case 'Cancelada':
                return 'red';
            default:
                return 'gray';
        }
    };

    const rows = data.map((item) => (
        <Table.Tr key={item.id}>
            <Table.Td>
                <Text size="sm" fw={500}>{item.horaInicio} - {item.horaFin}</Text>
            </Table.Td>
            <Table.Td>
                <Group gap="xs">
                    <div style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: 'var(--mantine-color-blue-5)'
                    }}></div>
                    <Text size="sm">{item.laboratorioNombre}</Text>
                </Group>
            </Table.Td>
            <Table.Td>
                <Group gap="sm">
                    <Avatar size={26} src={item.avatarUrl} radius={26} color="blue" name={item.solicitante}/>
                    <Text size="sm" fw={500}>{item.solicitante}</Text>
                </Group>
            </Table.Td>
            <Table.Td>
                <Text size="sm" c="dimmed">{item.asunto}</Text>
            </Table.Td>
            <Table.Td>
                <Badge color={getStatusColor(item.estado)} variant="light">
                    {item.estado}
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
                        <Menu.Item leftSection={<IconEye style={{width: rem(16), height: rem(16)}}/>}>
                            Ver detalles
                        </Menu.Item>
                        <Menu.Item
                            leftSection={<IconEdit style={{width: rem(16), height: rem(16)}}/>}
                            onClick={() => onEdit(item)}
                        >
                            Editar
                        </Menu.Item>
                        <Menu.Item
                            leftSection={<IconTrash style={{width: rem(16), height: rem(16)}}/>}
                            color="red"
                            onClick={() => onDelete(item)}
                        >
                            Cancelar
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="sm" striped highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Horario</Table.Th>
                        <Table.Th>Laboratorio</Table.Th>
                        <Table.Th>Solicitante</Table.Th>
                        <Table.Th>Asunto</Table.Th>
                        <Table.Th>Estado</Table.Th>
                        <Table.Th style={{width: rem(50)}}/>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {rows.length > 0 ? rows : (
                        <Table.Tr>
                            <Table.Td colSpan={6}>
                                <Text ta="center" c="dimmed" py="md">No se encontraron reservas</Text>
                            </Table.Td>
                        </Table.Tr>
                    )}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
}