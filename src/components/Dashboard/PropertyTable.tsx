'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useRouter } from 'next/navigation';
import { PROPERTIES } from '@/lib/mockData';

import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '16px',
    backgroundColor: '#F3F4F6',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: 'auto',
    },
    transition: 'all 0.2s',
    '&:hover': {
        backgroundColor: '#E5E7EB',
    },
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
            width: '30ch',
        },
        fontWeight: 500,
    },
}));

export default function PropertyTable() {
    const router = useRouter();

    return (
        <Card sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">Properties</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search properties..."
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => router.push('/properties/new')}
                        sx={{ whiteSpace: 'nowrap' }}
                    >
                        Add Property
                    </Button>
                </Box>
            </Box>

            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Name</TableCell>
                            <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Address</TableCell>
                            <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Status</TableCell>
                            <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Occupancy</TableCell>
                            <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }} align="right">Revenue</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {PROPERTIES.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar src={row.image} variant="rounded" sx={{ mr: 2, width: 48, height: 48 }} />
                                        <Typography variant="subtitle2" fontWeight="600">
                                            {row.name}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>{row.address}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={row.status}
                                        color={row.status === 'Good' ? 'success' : row.status === 'Warning' ? 'warning' : 'error'}
                                        size="small"
                                        sx={{ borderRadius: '8px', fontWeight: 600 }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography variant="body2" fontWeight="600" sx={{ mr: 1 }}>
                                            {Math.round((row.occupied / row.units) * 100)}%
                                        </Typography>
                                        <Box sx={{ width: 60, height: 6, bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
                                            <Box sx={{ width: `${(row.occupied / row.units) * 100}%`, height: '100%', bgcolor: 'primary.main' }} />
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="body2" fontWeight="600">
                                        ${row.revenue.toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        onClick={() => router.push(`/properties/${row.id}`)}
                                    >
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
}
