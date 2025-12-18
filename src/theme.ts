import {createTheme, rem} from '@mantine/core';

export const theme = createTheme({
    // Color primario: Usaremos 'indigo' o 'blue' pero ajustando el tono
    primaryColor: 'indigo',
    primaryShade: 6,

    // Tipografía
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    headings: {
        fontFamily: 'Inter, system-ui, sans-serif',
        sizes: {
            h1: {fontSize: rem(36)},
            h2: {fontSize: rem(30)},
        },
    },

    // Estilos por defecto para componentes
    components: {
        Button: {
            defaultProps: {
                size: 'md',
                radius: 'md',
            },
        },
        TextInput: {
            defaultProps: {
                variant: 'filled', // Fondo grisáceo, mejor para formularios largos
                radius: 'md',
            },
        },
        Select: {
            defaultProps: {
                variant: 'filled',
                radius: 'md',
            },
        },
        Paper: {
            defaultProps: {
                shadow: 'xs', // Sombra sutil siempre
                radius: 'md',
                withBorder: true,
            },
        },
        Table: {
            defaultProps: {
                verticalSpacing: 'sm',
                striped: true,
                highlightOnHover: true,
            },
        },
        Modal: {
            defaultProps: {
                radius: 'md',
                overlayProps: {
                    backgroundOpacity: 0.55,
                    blur: 3,
                }
            }
        }
    },
});