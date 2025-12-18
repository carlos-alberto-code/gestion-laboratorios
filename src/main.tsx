import {StrictMode} from 'react'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'
import {createRoot} from 'react-dom/client'
import {MantineProvider} from '@mantine/core'
import {Notifications} from '@mantine/notifications'
import {Sidebar} from "./Sidebar.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MantineProvider defaultColorScheme="auto">
            <Notifications position="top-right" zIndex={1000}/>
            <Sidebar/>
        </MantineProvider>
    </StrictMode>,
)