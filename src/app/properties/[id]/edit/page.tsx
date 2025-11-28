'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import PropertyForm from '@/components/Properties/PropertyForm';
import { useParams } from 'next/navigation';
import { PROPERTIES } from '@/lib/mockData';

export default function EditPropertyPage() {
    const params = useParams();
    const property = PROPERTIES.find((p) => p.id === params.id);

    if (!property) {
        return <Box sx={{ p: 3 }}>Property not found</Box>;
    }

    return (
        <Box>
            <PropertyForm initialData={property} isEdit={true} />
        </Box>
    );
}
