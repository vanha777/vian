'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import { TENANTS, PROPERTIES } from '@/lib/mockData';
import ChatWidget from '@/components/Chat/ChatWidget';

export default function TenantsListPage() {
    const router = useRouter();

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
                All Tenants
            </Typography>

            <Card sx={{ p: 3 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Property</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Unit</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Contact</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {TENANTS.map((tenant) => {
                                const property = PROPERTIES.find(p => p.id === tenant.propertyId);
                                return (
                                    <TableRow key={tenant.id}>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar>{tenant.name[0]}</Avatar>
                                                <Typography fontWeight="500">{tenant.name}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{property?.name || 'Unknown'}</TableCell>
                                        <TableCell>{tenant.unit}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={tenant.status}
                                                color={tenant.status === 'Active' ? 'success' : 'error'}
                                                size="small"
                                                sx={{ borderRadius: '8px' }}
                                            />
                                        </TableCell>
                                        <TableCell>{tenant.email}</TableCell>
                                        <TableCell align="right">
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                onClick={() => router.push(`/tenants/${tenant.id}`)}
                                            >
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            <ChatWidget />
        </Box>
    );
}
