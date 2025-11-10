import {useState} from 'react';
import {AppShell, NavLink, Title, Group} from '@mantine/core';
import {
    IconHome,
    IconArchive,
    IconBuildingWarehouse,
    IconCalendarEvent,
    IconChartBar,
    IconFlask,
} from '@tabler/icons-react';

import {StatsView} from './views/StatsView.tsx';
import {BookingView} from './views/BookingView.tsx';
import {DashboardView} from './views/DashboardView.tsx';
import {InventoryView} from './views/InventoryView.tsx';
import {LabManagementView} from './views/LabManagementView.tsx';

type ActiveView = 'dashboard' | 'inventory' | 'labs' | 'booking' | 'stats';

export function Sidebar() {

    const [activeView, setActiveView] = useState<ActiveView>('dashboard');

    const renderActiveView = () => {
        switch (activeView) {
            case 'dashboard':
                return <DashboardView/>;
            case 'inventory':
                return <InventoryView/>;
            case 'labs':
                return <LabManagementView/>;
            case 'booking':
                return <BookingView/>;
            case 'stats':
                return <StatsView/>;
            default:
                return <DashboardView/>;
        }
    };

    return (
        <AppShell
            header={{height: 60}}
            navbar={{width: 270, breakpoint: 'sm'}}
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
                    label="Inventario General"
                    leftSection={<IconArchive size="1rem" stroke={1.5}/>}
                    active={activeView === 'inventory'}
                    onClick={() => setActiveView('inventory')}
                />
                <NavLink
                    label="Gestión de Laboratorios"
                    leftSection={<IconBuildingWarehouse size="1rem" stroke={1.5}/>}
                    active={activeView === 'labs'}
                    onClick={() => setActiveView('labs')}
                />
                <NavLink
                    label="Reservaciones"
                    leftSection={<IconCalendarEvent size="1rem" stroke={1.5}/>}
                    active={activeView === 'booking'}
                    onClick={() => setActiveView('booking')}
                />
                <NavLink
                    label="Estadísticas"
                    leftSection={<IconChartBar size="1rem" stroke={1.5}/>}
                    active={activeView === 'stats'}
                    onClick={() => setActiveView('stats')}
                />
            </AppShell.Navbar>

            <AppShell.Main>
                {renderActiveView()}
            </AppShell.Main>
        </AppShell>
    );
}