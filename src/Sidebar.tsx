import {useState} from 'react';
import {AppShell, NavLink, Title, Group, Stack, ThemeIcon, rem, Text} from '@mantine/core';
import {
    IconHome,
    IconArchive,
    IconCalendarEvent,
    IconFlask,
    IconArrowsExchange,
} from '@tabler/icons-react';

import {BookingView} from './views/BookingView.tsx';
import {DashboardView} from './views/DashboardView.tsx';
import {InventoryView} from './views/InventoryView.tsx';
import {MovementsView} from "./views/MovementsView.tsx";

type ActiveView = 'dashboard' | 'inventory' | 'booking' | 'movements';

export function Sidebar() {
    const [activeView, setActiveView] = useState<ActiveView>('dashboard');

    const renderActiveView = () => {
        switch (activeView) {
            case 'dashboard':
                return <DashboardView/>;
            case 'inventory':
                return <InventoryView/>;
            case 'booking':
                return <BookingView/>;
            case 'movements':
                return <MovementsView/>;
            default:
                return <DashboardView/>;
        }
    };

    // Helper para generar los links con el estilo oscuro personalizado
    const renderLink = (view: ActiveView, label: string, Icon: any) => {
        const isActive = activeView === view;
        return (
            <NavLink
                label={<Text fw={500} size="sm">{label}</Text>}
                leftSection={<Icon size="1.2rem" stroke={1.5}/>}
                active={isActive}
                onClick={() => setActiveView(view)}

                // --- ESTILOS CLAVE ---
                color="brand"        // Usa nuestro rojo
                variant="filled"     // Rellena el fondo de rojo al estar activo

                // Estilos dinámicos manuales para el modo oscuro
                styles={(theme) => ({
                    root: {
                        borderRadius: theme.radius.md,
                        marginBottom: 4,
                        // Si está activo: Rojo fondo, Texto blanco
                        // Si NO está activo: Transparente fondo, Texto gris claro
                        color: isActive ? 'white' : theme.colors.gray[4],

                        '&:hover': {
                            // Hover gris oscuro si no está activo
                            backgroundColor: isActive ? undefined : 'rgba(255, 255, 255, 0.05)',
                        }
                    },
                    section: {
                        // El icono también cambia de color
                        color: isActive ? 'white' : theme.colors.gray[5],
                    }
                })}
            />
        );
    };

    return (
        <AppShell
            header={{height: 60}}
            navbar={{width: 260, breakpoint: 'sm'}}
            padding="md"
            styles={(theme) => ({
                main: {backgroundColor: theme.colors.gray[0]}, // Contenido sigue claro
            })}
        >
            <AppShell.Header p="md" bg="#1A1B1E" style={{borderRight: 'none'}}>
                <Group h="100%">
                    <ThemeIcon variant="filled" size="lg" radius="md" color="brand">
                        <IconFlask style={{width: rem(20), height: rem(20)}} stroke={1.5}/>
                    </ThemeIcon>
                    <Title order={4} c="white">Gestión Laboratorios</Title>
                </Group>
            </AppShell.Header>

            {/* Navbar Oscuro (#1A1B1E es el dark standard de Mantine) */}
            <AppShell.Navbar p="md" bg="#1A1B1E" style={{borderRight: 'none'}}>
                <Stack gap={4} mt="md">
                    <Text size="xs" fw={700} c="dimmed" mb="xs" tt="uppercase">
                        Principal
                    </Text>

                    {renderLink('dashboard', 'Dashboard', IconHome)}
                    {renderLink('inventory', 'Inventario', IconArchive)}
                    {renderLink('movements', 'Movimientos', IconArrowsExchange)}
                    {renderLink('booking', 'Reservaciones', IconCalendarEvent)}
                </Stack>
            </AppShell.Navbar>

            <AppShell.Main>
                {renderActiveView()}
            </AppShell.Main>
        </AppShell>
    );
}