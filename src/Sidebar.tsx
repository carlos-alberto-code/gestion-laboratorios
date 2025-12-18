import {useState} from 'react';
import {AppShell, NavLink, Title, Group} from '@mantine/core';
import {
    IconHome,
    IconArchive,
    IconCalendarEvent,
    IconFlask, IconArrowsExchange,
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
            navbar={{width: 240, breakpoint: 'sm'}}
            padding="md"
        >
            <AppShell.Header p="md">
                <Group>
                    <IconFlask stroke={1.5}/>
                    <Title order={4}>Gestión de Laboratorios</Title>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <NavLink
                    label="Dashboard"
                    leftSection={<IconHome size="1rem" stroke={1.5}/>}
                    active={activeView === 'dashboard'}
                    onClick={() => setActiveView('dashboard')}
                />
                <NavLink
                    label="Inventario"
                    leftSection={<IconArchive size="1rem" stroke={1.5}/>}
                    active={activeView === 'inventory'}
                    onClick={() => setActiveView('inventory')}
                />
                <NavLink
                    label="Movimientos"
                    leftSection={<IconArrowsExchange size="1rem" stroke={1.5}/>}
                    active={activeView === 'movements'}
                    onClick={() => setActiveView('movements')}
                />
                <NavLink
                    label="Reservaciones"
                    leftSection={<IconCalendarEvent size="1rem" stroke={1.5}/>}
                    active={activeView === 'booking'}
                    onClick={() => setActiveView('booking')}
                />
            </AppShell.Navbar>

            <AppShell.Main>
                {renderActiveView()}
            </AppShell.Main>
        </AppShell>
    );
}