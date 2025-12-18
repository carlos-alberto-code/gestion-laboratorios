import {createTheme, type MantineColorsTuple} from '@mantine/core';

// Definimos nuestra paleta personalizada "Rojo Universitario".
// Generada para ser seria y legible, no agresiva.
const universityRed: MantineColorsTuple = [
    '#ffe9e9', // 0 - Fondos muy claros (ej. hover suave)
    '#ffd1d1', // 1
    '#fba0a1', // 2
    '#f76d6e', // 3
    '#f33f42', // 4
    '#f02427', // 5
    '#d61a1d', // 6 -> Este será nuestro COLOR PRINCIPAL (Primary)
    '#c01014', // 7 -> Hover de botones
    '#aa060e', // 8
    '#960007'  // 9 - Textos oscuros
];

export const theme = createTheme({
    // 1. Inyectamos nuestra paleta con el nombre 'brand'
    colors: {
        brand: universityRed,
    },

    // 2. Le decimos a Mantine que use 'brand' como el color de TODA la app
    primaryColor: 'brand',
    primaryShade: 6, // Usamos el tono #d61a1d como base (serio y fuerte)

    // Configuración base (igual que antes pero ajustada al rojo)
    defaultRadius: 'md',
    fontFamily: 'Inter, system-ui, sans-serif',

    components: {
        Button: {
            defaultProps: {
                size: 'sm',
                fw: 600,
            },
            styles: {
                // Hacemos que los botones tengan un degradado sutil si quisieras,
                // pero plano es más moderno.
                root: {textTransform: 'uppercase', letterSpacing: '0.5px'}
            }
        },
        // Los inputs filled en rojo suave se ven muy bien
        TextInput: {
            defaultProps: {variant: 'filled'},
        },
        // Ajustamos los badges para que usen nuestro rojo
        Badge: {
            defaultProps: {radius: 'sm', variant: 'light'},
        },
        // Las tarjetas mantienen la limpieza
        Paper: {
            defaultProps: {
                shadow: 'sm',
                radius: 'md',
                withBorder: true,
            },
        },
        // Un toque especial: La barra de navegación activa
        NavLink: {
            defaultProps: {
                variant: 'light',
                color: 'brand',
            },
            styles: {
                // Hacemos que el link activo tenga una barra lateral roja gruesa
                root: {position: 'relative'},
                label: {fontWeight: 500}
            }
        }
    },
});