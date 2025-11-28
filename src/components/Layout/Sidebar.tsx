'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
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
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    borderRight: 'none',
                    bgcolor: 'background.default',
                    padding: 2,
                },
            }}
        >
            <Box sx={{ mb: 4, px: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{
                    width: 32,
                    height: 32,
                    background: 'linear-gradient(135deg, #38BDF8 0%, #A78BFA 100%)',
                    borderRadius: '8px'
                }} />
                <Typography variant="h5" fontWeight="bold" color="text.primary">
                    Vian
                </Typography>
            </Box>

            <List>
                {MENU_ITEMS.map((item) => {
                    const active = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
                    return (
                        <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                            <ListItemButton
                                onClick={() => router.push(item.path)}
                                sx={{
                                    borderRadius: '12px',
                                    background: active ? 'linear-gradient(135deg, #38BDF8 0%, #A78BFA 100%)' : 'transparent',
                                    color: active ? 'primary.contrastText' : 'text.secondary',
                                    '&:hover': {
                                        bgcolor: active ? 'transparent' : 'rgba(0,0,0,0.04)',
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: active ? 'inherit' : 'text.secondary', minWidth: 40 }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{ fontWeight: active ? 600 : 500 }}
                                />
                                {active && (
                                    <Box sx={{ width: 4, height: 24, bgcolor: 'white', borderRadius: 2, position: 'absolute', right: 8 }} />
                                )}
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Drawer>
    );
}
