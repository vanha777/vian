'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/DashboardRounded';
import BusinessIcon from '@mui/icons-material/BusinessRounded';
import PeopleIcon from '@mui/icons-material/PeopleRounded';
import ChatIcon from '@mui/icons-material/ChatBubbleRounded';
import SettingsIcon from '@mui/icons-material/SettingsRounded';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { usePathname, useRouter } from 'next/navigation';

const drawerWidth = 280;

const MENU_ITEMS = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Properties', icon: <BusinessIcon />, path: '/properties' },
    { text: 'Tenants', icon: <PeopleIcon />, path: '/tenants' },
    { text: 'Messages', icon: <ChatIcon />, path: '/messages' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <Paper
            elevation={0}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                borderRadius: '24px',
                bgcolor: 'background.paper',
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: 'calc(100vh - 48px)', // Full height minus padding
                position: 'sticky',
                top: 24,
            }}
        >
            <Box sx={{ mb: 6, px: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{
                    width: 40,
                    height: 40,
                    background: 'linear-gradient(135deg, #38BDF8 0%, #A78BFA 100%)',
                    borderRadius: '12px',
                    boxShadow: '0px 4px 12px rgba(56, 189, 248, 0.3)'
                }} />
                <Typography variant="h5" fontWeight="800" color="text.primary" sx={{ letterSpacing: '-0.5px' }}>
                    Vian
                </Typography>
            </Box>

            <List sx={{ gap: 1, display: 'flex', flexDirection: 'column' }}>
                {MENU_ITEMS.map((item) => {
                    const active = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
                    return (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton
                                onClick={() => router.push(item.path)}
                                sx={{
                                    borderRadius: '16px',
                                    mb: 1,
                                    py: 1.5,
                                    px: 2.5,
                                    background: active ? 'linear-gradient(135deg, #38BDF8 0%, #A78BFA 100%)' : 'transparent',
                                    color: active ? 'white' : 'text.secondary',
                                    transition: 'all 0.2s ease-in-out',
                                    '&:hover': {
                                        bgcolor: active ? 'transparent' : 'rgba(0,0,0,0.03)',
                                        transform: 'translateX(4px)',
                                    },
                                    boxShadow: active ? '0px 4px 12px rgba(56, 189, 248, 0.25)' : 'none',
                                }}
                            >
                                <ListItemIcon sx={{ color: active ? 'inherit' : 'text.secondary', minWidth: 40 }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontWeight: active ? 600 : 500,
                                        fontSize: '0.95rem'
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Paper>
    );
}
