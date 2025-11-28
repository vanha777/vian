'use client';
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#38BDF8', // Sky Blue start of gradient
            light: '#A78BFA', // Violet end of gradient
            dark: '#0EA5E9',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#A78BFA',
            light: '#C4B5FD',
            dark: '#8B5CF6',
            contrastText: '#ffffff',
        },
        error: {
            main: '#FB7185', // Soft Coral
        },
        background: {
            default: '#FFFFFF', // Pure White
            paper: '#FFFFFF',
        },
        text: {
            primary: '#111827', // Ink Black
            secondary: '#6B7280', // Cool Gray
        },
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#111827',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 700,
            color: '#111827',
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 600,
            color: '#111827',
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 600,
            color: '#111827',
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#111827',
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 600,
            color: '#111827',
        },
        body1: {
            fontSize: '1rem',
            color: '#374151',
        },
        body2: {
            fontSize: '0.875rem',
            color: '#6B7280',
        },
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: '12px',
                    fontWeight: 600,
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0px 4px 12px rgba(56, 189, 248, 0.2)',
                    },
                },
                containedPrimary: {
                    background: 'linear-gradient(135deg, #38BDF8 0%, #A78BFA 100%)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #0EA5E9 0%, #8B5CF6 100%)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '20px',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.03)', // Softer shadow
                    border: '1px solid #F3F4F6', // Subtle border
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
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                },
                colorSuccess: {
                    backgroundColor: '#ECFDF5',
                    color: '#059669',
                },
                colorError: {
                    backgroundColor: '#FFF1F2',
                    color: '#BE123C',
                },
                colorWarning: {
                    backgroundColor: '#FFFBEB',
                    color: '#B45309',
                },
            },
        },
    },
});

export default theme;
