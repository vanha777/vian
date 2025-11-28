'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/NotificationsNoneRounded';
import Avatar from '@mui/material/Avatar';

export default function Header() {
    return (
        <Box sx={{ px: 1 }}>
            <Toolbar sx={{
                bgcolor: 'transparent',
                justifyContent: 'space-between',
                p: '0 !important',
                minHeight: 'auto !important',
                gap: 2
            }}>
                {/* Title Bubble */}
                <Box sx={{
                    bgcolor: 'background.paper',
                    borderRadius: '24px',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.02)',
                    py: 1.5,
                    px: 3,
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Typography variant="h6" noWrap component="div" color="text.primary" fontWeight="bold">
                        Dashboard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Welcome back, Patrick
                    </Typography>
                </Box>

                {/* Actions Bubble */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{
                        bgcolor: 'background.paper',
                        borderRadius: '24px',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.02)',
                        p: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                    }}>
                        <IconButton
                            size="large"
                            sx={{
                                bgcolor: '#F3F4F6',
                                borderRadius: '16px',
                                width: 48,
                                height: 48,
                                '&:hover': { bgcolor: '#E5E7EB' }
                            }}
                        >
                            <Badge badgeContent={4} color="error">
                                <NotificationsIcon sx={{ color: 'text.secondary' }} />
                            </Badge>
                        </IconButton>

                        <Box sx={{
                            width: 1,
                            height: 32,
                            bgcolor: 'divider',
                            mx: 1
                        }} />

                        <IconButton sx={{ p: 0 }}>
                            <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/2.jpg"
                                sx={{
                                    bgcolor: 'primary.main',
                                    width: 48,
                                    height: 48,
                                    boxShadow: '0px 4px 12px rgba(56, 189, 248, 0.2)'
                                }}
                            >V</Avatar>
                        </IconButton>
                    </Box>
                </Box>
            </Toolbar>
        </Box>
    );
}
