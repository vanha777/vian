'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';

interface PropertyFormProps {
    initialData?: {
        name: string;
        address: string;
        type: string;
        status: string;
        units: number;
        image: string;
        revenue: number;
    };
    isEdit?: boolean;
}

const PROPERTY_TYPES = ['Residential', 'Commercial', 'Industrial', 'Mixed Use'];
const PROPERTY_STATUS = ['Good', 'Warning', 'Critical'];

export default function PropertyForm({ initialData, isEdit = false }: PropertyFormProps) {
    const router = useRouter();
    const [formData, setFormData] = React.useState({
        name: initialData?.name || '',
        address: initialData?.address || '',
        type: initialData?.type || 'Residential',
        status: initialData?.status || 'Good',
        units: initialData?.units || 0,
        image: initialData?.image || '/static/images/property/1.jpg',
        revenue: initialData?.revenue || 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'units' || name === 'revenue' ? Number(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would make an API call
        console.log('Form submitted:', formData);
        router.push('/properties');
    };

    return (
        <Card sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 4 }}>
                {isEdit ? 'Edit Property' : 'Add New Property'}
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3 }}>
                    <Box sx={{ gridColumn: 'span 12' }}>
                        <TextField
                            fullWidth
                            label="Property Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            variant="outlined"
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                        />
                    </Box>
                    <Box sx={{ gridColumn: 'span 12' }}>
                        <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            variant="outlined"
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                        />
                    </Box>
                    <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
                        <TextField
                            select
                            fullWidth
                            label="Type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            variant="outlined"
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                        >
                            {PROPERTY_TYPES.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                    <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
                        <TextField
                            select
                            fullWidth
                            label="Status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            variant="outlined"
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                        >
                            {PROPERTY_STATUS.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                    <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
                        <TextField
                            fullWidth
                            label="Total Units"
                            name="units"
                            type="number"
                            value={formData.units}
                            onChange={handleChange}
                            required
                            variant="outlined"
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                        />
                    </Box>
                    <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
                        <TextField
                            fullWidth
                            label="Monthly Revenue ($)"
                            name="revenue"
                            type="number"
                            value={formData.revenue}
                            onChange={handleChange}
                            required
                            variant="outlined"
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                        />
                    </Box>
                    <Box sx={{ gridColumn: 'span 12' }}>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={() => router.back()}
                                sx={{ borderRadius: '12px', px: 4 }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ borderRadius: '12px', px: 4 }}
                            >
                                {isEdit ? 'Save Changes' : 'Create Property'}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Card>
    );
}
