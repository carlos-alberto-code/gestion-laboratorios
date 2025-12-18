import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {MantineProvider} from '@mantine/core'
import {Notifications} from '@mantine/notifications'
import {Sidebar} from "./Sidebar.tsx";
import {theme} from './theme';

import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MantineProvider theme={theme} defaultColorScheme="light">
            <Notifications position="top-right" zIndex={2000}/>
            <Sidebar/>
        </MantineProvider>
    </StrictMode>,
)