import './index.css'
import {StrictMode} from 'react'
import '@mantine/core/styles.css'
import {createRoot} from 'react-dom/client'
import {MantineProvider} from '@mantine/core'
import {Sidebar} from "./Sidebar.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MantineProvider defaultColorScheme="light">
            <Sidebar/>
        </MantineProvider>
    </StrictMode>,
)