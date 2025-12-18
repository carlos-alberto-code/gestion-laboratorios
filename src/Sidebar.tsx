import {useState} from 'react';
import {AppShell, NavLink, Title, Group, Stack, ThemeIcon, rem} from '@mantine/core';
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

    return (
        <AppShell
            header={{height: 60}}
            navbar={{width: 260, breakpoint: 'sm'}} // Un poco más ancho para mejor lectura
            padding="md"
            // Color de fondo para el área principal (crea profundidad)
            styles={(theme) => ({
                main: {backgroundColor: theme.colors.gray[0]},
            })}
        >
            <AppShell.Header p="md" bg="white">
                <Group h="100%">
                    {/* Logo con icono temático */}
                    <ThemeIcon variant="light" size="lg" radius="md" color="indigo">
                        <IconFlask style={{width: rem(20), height: rem(20)}} stroke={1.5}/>
                    </ThemeIcon>
                    <Title order={4}>Gestión Laboratorios</Title>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md" bg="white">
                <Stack gap={6}>
                    <NavLink
                        label="Dashboard"
                        leftSection={<IconHome size="1.2rem" stroke={1.5}/>}
                        active={activeView === 'dashboard'}
                        onClick={() => setActiveView('dashboard')}
                        variant="light"
                        color="indigo"
                        style={{borderRadius: 8, fontWeight: 500}}
                    />
                    <NavLink
                        label="Inventario"
                        leftSection={<IconArchive size="1.2rem" stroke={1.5}/>}
                        active={activeView === 'inventory'}
                        onClick={() => setActiveView('inventory')}
                        variant="light"
                        color="indigo"
                        style={{borderRadius: 8, fontWeight: 500}}
                    />
                    <NavLink
                        label="Movimientos"
                        leftSection={<IconArrowsExchange size="1.2rem" stroke={1.5}/>}
                        active={activeView === 'movements'}
                        onClick={() => setActiveView('movements')}
                        variant="light"
                        color="indigo"
                        style={{borderRadius: 8, fontWeight: 500}}
                    />
                    <NavLink
                        label="Reservaciones"
                        leftSection={<IconCalendarEvent size="1.2rem" stroke={1.5}/>}
                        active={activeView === 'booking'}
                        onClick={() => setActiveView('booking')}
                        variant="light"
                        color="indigo"
                        style={{borderRadius: 8, fontWeight: 500}}
                    />
                </Stack>
            </AppShell.Navbar>

            <AppShell.Main>
                {renderActiveView()}
            </AppShell.Main>
        </AppShell>
    );
}