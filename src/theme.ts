import {createTheme, type MantineColorsTuple, rem} from '@mantine/core';

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

// Paleta complementaria: Gris oscuro para el sidebar
const darkSlate: MantineColorsTuple = [
    '#f5f5f6',
    '#e6e6e7',
    '#cdcdcf',
    '#b2b3b6',
    '#95979c',
    '#7a7c82',
    '#25262b', // Color principal del sidebar
    '#1e1f23',
    '#17181b',
    '#0f1012'
];

// Paleta de acentos: Verde para éxito/operativo
const successGreen: MantineColorsTuple = [
    '#e6fcf5',
    '#c3fae8',
    '#96f2d7',
    '#63e6be',
    '#38d9a9',
    '#20c997',
    '#12b886',
    '#0ca678',
    '#099268',
    '#087f5b'
];

export const theme = createTheme({
    // 1. Inyectamos nuestras paletas personalizadas
    colors: {
        brand: universityRed,
        dark: darkSlate,
        success: successGreen,
    },

    // 2. Le decimos a Mantine que use 'brand' como el color de TODA la app
    primaryColor: 'brand',
    primaryShade: 6, // Usamos el tono #d61a1d como base (serio y fuerte)

    // Configuración base profesional
    defaultRadius: 'md',
    fontFamily: 'Inter, system-ui, sans-serif',
    headings: {
        fontFamily: 'Inter, system-ui, sans-serif',
        fontWeight: '600',
    },

    // Sombras personalizadas más suaves y profesionales
    shadows: {
        xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
        sm: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },

    components: {
        Button: {
            defaultProps: {
                size: 'sm',
                fw: 600,
            },
            styles: {
                root: {
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    transition: 'all 150ms ease',
                }
            }
        },
        // Los inputs con estilo filled más suave
        TextInput: {
            defaultProps: {variant: 'filled'},
            styles: {
                input: {
                    '&:focus': {
                        borderColor: 'var(--mantine-color-brand-6)',
                    }
                }
            }
        },
        Select: {
            defaultProps: {variant: 'filled'},
            styles: {
                input: {
                    '&:focus': {
                        borderColor: 'var(--mantine-color-brand-6)',
                    }
                }
            }
        },
        NumberInput: {
            defaultProps: {variant: 'filled'},
        },
        DatePickerInput: {
            defaultProps: {variant: 'filled'},
        },
        TimeInput: {
            defaultProps: {variant: 'filled'},
        },
        Textarea: {
            defaultProps: {variant: 'filled'},
        },
        // Badges con estilo consistente
        Badge: {
            defaultProps: {radius: 'sm', variant: 'light'},
        },
        // Papers con estilo limpio
        Paper: {
            defaultProps: {
                shadow: 'sm',
                radius: 'md',
                withBorder: true,
            },
            styles: {
                root: {
                    borderColor: 'var(--mantine-color-gray-2)',
                }
            }
        },
        // Cards unificadas con Paper
        Card: {
            defaultProps: {
                shadow: 'sm',
                radius: 'md',
                withBorder: true,
            },
        },
        // Tablas con estilo profesional
        Table: {
            styles: {
                th: {
                    fontSize: rem(12),
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    color: 'var(--mantine-color-gray-6)',
                    borderBottom: '2px solid var(--mantine-color-gray-2)',
                },
                td: {
                    borderBottom: '1px solid var(--mantine-color-gray-1)',
                }
            }
        },
        // Títulos con color consistente
        Title: {
            styles: {
                root: {
                    color: 'var(--mantine-color-gray-9)',
                }
            }
        },
        // Modales con estilo consistente
        Modal: {
            defaultProps: {
                radius: 'md',
                overlayProps: {
                    backgroundOpacity: 0.55,
                    blur: 3,
                },
            },
            styles: {
                title: {
                    fontWeight: 600,
                    fontSize: rem(18),
                },
            }
        },
        // Menús con bordes suaves
        Menu: {
            defaultProps: {
                shadow: 'md',
                radius: 'md',
            },
        },
        // ActionIcons consistentes
        ActionIcon: {
            defaultProps: {
                radius: 'md',
            },
        },
        // ThemeIcons más elegantes
        ThemeIcon: {
            defaultProps: {
                radius: 'md',
            },
        },
        // NavLinks para sidebar
        NavLink: {
            defaultProps: {
                variant: 'light',
                color: 'brand',
            },
            styles: {
                root: {position: 'relative'},
                label: {fontWeight: 500}
            }
        },
        // Progreso con colores brand
        Progress: {
            styles: {
                root: {
                    backgroundColor: 'var(--mantine-color-gray-2)',
                }
            }
        },
        // RingProgress consistente
        RingProgress: {
            styles: {
                root: {
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                }
            }
        },
        // LoadingOverlay con estilo
        LoadingOverlay: {
            defaultProps: {
                overlayProps: {
                    radius: 'md',
                    blur: 2,
                },
            },
        },
        // Divider sutil
        Divider: {
            styles: {
                root: {
                    borderColor: 'var(--mantine-color-gray-2)',
                }
            }
        },
        // Notifications
        Notification: {
            defaultProps: {
                radius: 'md',
            },
        },
    },
});