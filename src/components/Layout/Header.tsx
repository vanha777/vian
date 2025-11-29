'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/NotificationsNoneRounded';
import Avatar from '@mui/material/Avatar';
import { alpha, useTheme } from '@mui/material/styles';
import { usePathname, useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded';

const AIStatus = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1.5, py: 0.5, borderRadius: '20px', bgcolor: 'rgba(56, 189, 248, 0.08)' }}>
        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#38BDF8' }} />
        <Typography variant="caption" fontWeight="600" color="primary.main">
            AI Active
        </Typography>
    </Box>
);

export default function Header() {
    const theme = useTheme();
    const pathname = usePathname();
    const router = useRouter();
    const isManager = pathname === '/manager';

    return (
        <Box sx={{ px: 1 }}>
            <Toolbar sx={{
                bgcolor: 'transparent',
                justifyContent: 'space-between',
                p: '0 !important',
                minHeight: 'auto !important',
                gap: 2
            }}>
                {/* Title Section */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {isManager && (
                        <IconButton
                            onClick={() => router.push('/')}
                            sx={{
                                bgcolor: 'white',
                                boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
                                '&:hover': { bgcolor: '#F9FAFB' }
                            }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                    )}
                    <Box>
                        <Typography variant="h5" noWrap component="div" color="text.primary" fontWeight="800" sx={{ letterSpacing: '-0.5px' }}>
                            {isManager ? 'AI Manager' : 'Dashboard'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                            Welcome back, Patrick
                        </Typography>
                    </Box>
                    <AIStatus />
                </Box>

                {/* Actions Section */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton
                        size="large"
                        sx={{
                            color: 'text.secondary',
                            borderRadius: '12px',
                            '&:hover': { bgcolor: 'rgba(0,0,0,0.04)', color: 'text.primary' }
                        }}
                    >
                        <Badge badgeContent={4} color="error" sx={{ '& .MuiBadge-badge': { boxShadow: '0 0 0 2px #fff' } }}>
                            <NotificationsIcon sx={{ fontSize: 24 }} />
                        </Badge>
                    </IconButton>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 1, p: 0.5, pr: 2, pl: 0.5, borderRadius: '30px', transition: 'all 0.2s', '&:hover': { bgcolor: 'rgba(255,255,255,0.5)' } }}>
                        <Avatar
                            alt="Patrick V."
                            src="/static/images/avatar/2.jpg"
                            sx={{
                                width: 40,
                                height: 40,
                                bgcolor: 'primary.main',
                                fontSize: '1rem',
                                fontWeight: 'bold'
                            }}
                        >
                            P
                        </Avatar>
                        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                            <Typography variant="subtitle2" fontWeight="700" lineHeight={1.2}>Patrick V.</Typography>
                            <Typography variant="caption" color="text.secondary" fontWeight="500">Admin</Typography>
                        </Box>
                    </Box>
                </Box>
            </Toolbar>
        </Box>
    );
}
