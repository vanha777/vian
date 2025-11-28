'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/NotificationsNoneRounded';
import Avatar from '@mui/material/Avatar';
import { alpha, styled } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '30px',
    backgroundColor: theme.palette.background.paper,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1.5, 1, 1.5, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function Header() {
    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - 280px)` },
                ml: { sm: `280px` },
                bgcolor: 'transparent',
                boxShadow: 'none',
                pt: 2,
                pr: 2
            }}
        >
            <Toolbar sx={{
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                mx: 2,
                justifyContent: 'space-between',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.02)',
            }}>
                <Box>
                    <Typography variant="h6" noWrap component="div" color="text.primary" fontWeight="bold">
                        Dashboard
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search..."
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>

                    <IconButton size="large" color="inherit">
                        <Badge badgeContent={4} color="error">
                            <NotificationsIcon sx={{ color: 'text.secondary' }} />
                        </Badge>
                    </IconButton>
                    <IconButton sx={{ p: 0, ml: 1 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" sx={{ bgcolor: 'primary.main' }}>V</Avatar>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
