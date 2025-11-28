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

export default function PropertyTable() {
    const router = useRouter();

    return (
        <Card sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" fontWeight="700">
                    Properties
                </Typography>
                <Button variant="contained" color="primary">
                    Add Property
                </Button>
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
