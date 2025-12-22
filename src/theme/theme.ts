'use client';

import { createTheme, ThemeOptions } from '@mui/material/styles';

const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
    palette: {
        mode,
        primary: {
            main: '#FFC107', // Tungsten Sun
            contrastText: '#1B1C20',
        },
        secondary: {
            main: '#1A237E', // Adire Indigo
        },
        background: {
            default: mode === 'light' ? '#FAF8F6' : '#1B1C20', // Solar / Void
            paper: mode === 'light' ? '#EADDD3' : '#2D2421',   // Sand / Laterite
        },
        text: {
            primary: mode === 'light' ? '#1B1C20' : '#FAF8F6',
            secondary: mode === 'light' ? '#5E4E42' : '#A69080',
        },
        divider: mode === 'light' ? 'rgba(26, 35, 126, 0.1)' : '#3D3D3D',
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
        borderRadius: 12,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: mode === 'light' ? '#FAF8F6' : '#1B1C20',
                    scrollbarColor: '#FFC107 transparent',
                    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                        width: 8,
                        height: 8,
                    },
                    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                        borderRadius: 12,
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
                    borderRadius: 12,
                    padding: '12px 24px',
                    fontWeight: 800,
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: mode === 'light'
                        ? '0px 2px 4px rgba(26, 35, 126, 0.2), 0px 8px 16px rgba(26, 35, 126, 0.1), inset 0px 1px 0px rgba(255, 193, 7, 0.2)'
                        : '0px 2px 4px rgba(0, 0, 0, 0.4), 0px 8px 16px rgba(26, 35, 126, 0.2), inset 0px 1px 0px rgba(255, 193, 7, 0.2)',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: mode === 'light'
                            ? '0px 4px 8px rgba(26, 35, 126, 0.4), 0px 12px 24px rgba(26, 35, 126, 0.2), inset 0px 1px 0px rgba(255, 193, 7, 0.2)'
                            : '0px 4px 8px rgba(0, 0, 0, 0.6), 0px 12px 24px rgba(26, 35, 126, 0.4), inset 0px 1px 0px rgba(255, 193, 7, 0.2)',
                    },
                    '&:active': {
                        transform: 'translateY(0)',
                        boxShadow: 'none',
                    },
                },
                containedPrimary: {
                    backgroundColor: '#FFC107',
                    color: '#1B1C20',
                    '&:hover': {
                        backgroundColor: '#FFD54F',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 24,
                    backgroundColor: mode === 'light' ? '#EADDD3' : '#2D2421',
                    border: `2px solid ${mode === 'light' ? 'rgba(26, 35, 126, 0.1)' : '#3D3D3D'}`,
                    boxShadow: mode === 'light'
                        ? '0px 2px 4px rgba(26, 35, 126, 0.2), 0px 8px 16px rgba(26, 35, 126, 0.1), inset 0px 1px 0px rgba(255, 193, 7, 0.2)'
                        : '0px 2px 4px rgba(0, 0, 0, 0.4), 0px 8px 16px rgba(26, 35, 126, 0.2), inset 0px 1px 0px rgba(255, 193, 7, 0.2)',
                    backgroundImage: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: mode === 'light'
                            ? '0px 4px 8px rgba(26, 35, 126, 0.4), 0px 12px 24px rgba(26, 35, 126, 0.2), inset 0px 1px 0px rgba(255, 193, 7, 0.2)'
                            : '0px 4px 8px rgba(0, 0, 0, 0.6), 0px 12px 24px rgba(26, 35, 126, 0.4), inset 0px 1px 0px rgba(255, 193, 7, 0.2)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 24,
                    backgroundImage: 'none',
                    backgroundColor: mode === 'light' ? '#EADDD3' : '#2D2421',
                },
                elevation24: {
                    borderRadius: 32,
                    boxShadow: mode === 'light'
                        ? '0px 8px 16px rgba(26, 35, 126, 0.3), 0px 24px 48px rgba(0, 0, 0, 0.2)'
                        : '0px 8px 16px rgba(0, 0, 0, 0.8), 0px 24px 48px rgba(26, 35, 126, 0.6)',
                },
            },
        },
    },
});

export const lightTheme = createTheme(getDesignTokens('light'));
export const darkTheme = createTheme(getDesignTokens('dark'));

export default darkTheme;
