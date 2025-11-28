'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Sidebar from './Sidebar';
import Header from './Header';

const drawerWidth = 280;

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F3F4F6', p: 3, gap: 3 }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 3, maxWidth: `calc(100% - ${drawerWidth}px - 24px)` }}>
                <Header />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        bgcolor: 'background.paper',
                        borderRadius: '24px',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.02)',
                        p: 3,
                        overflow: 'hidden',
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
