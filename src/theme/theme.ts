'use client';

import { createTheme, ThemeOptions } from '@mui/material/styles';

const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
    palette: {
        mode,
        primary: {
            main: '#FFC107', // Tungsten Sun
            contrastText: '#1B1C20',
        },
        background: {
            default: '#1B1C20', // The Void
            paper: '#2D2421',   // The Matter (Baked Laterite)
        },
        text: {
            primary: '#FAF8F6', // Brownish White
            secondary: '#A69080',
        },
        divider: '#3D3D3D',
    },
    typography: {
        fontFamily: 'var(--font-inter), "Inter", sans-serif',
        h1: {
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '3rem',
            fontWeight: 800,
            letterSpacing: '-0.03em',
        },
        h2: {
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '2.25rem',
            fontWeight: 700,
        },
        h3: {
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '1.75rem',
            fontWeight: 700,
        },
        h4: {
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '1.25rem',
            fontWeight: 700,
        },
        h5: {
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '1.1rem',
            fontWeight: 600,
        },
        h6: {
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '0.9rem',
            fontWeight: 600,
        },
        button: {
            fontFamily: 'var(--font-mono), monospace',
            textTransform: 'uppercase',
            fontWeight: 700,
            letterSpacing: '0.05em',
        },
    },
    shape: {
        borderRadius: 4,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#1B1C20',
                    scrollbarColor: '#FFC107 transparent',
                    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                        width: 8,
                        height: 8,
                    },
                    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                        borderRadius: 0,
                        backgroundColor: 'rgba(255, 193, 7, 0.2)',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 193, 7, 0.4)',
                        },
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 2,
                    padding: '10px 20px',
                    fontWeight: 800,
                    boxShadow: '4px 4px 0 rgba(26, 35, 126, 0.8)',
                    '&:hover': {
                        transform: 'translate(-2px, -2px)',
                        boxShadow: '6px 6px 0 rgba(26, 35, 126, 0.9)',
                    },
                    '&:active': {
                        transform: 'translate(2px, 2px)',
                        boxShadow: 'none',
                    },
                },
                containedPrimary: {
                    backgroundColor: '#FFC107',
                    color: '#1B1C20',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#2D2421',
                    border: '1px solid #3D3D3D',
                    boxShadow: '8px 12px 20px rgba(26, 35, 126, 0.4)',
                    backgroundImage: 'none', // Remove MUI default overlay
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
    },
});

export const theme = createTheme(getDesignTokens('dark'));
export default theme;
