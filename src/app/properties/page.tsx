'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropertyTable from '@/components/Dashboard/PropertyTable';
import ChatWidget from '@/components/Chat/ChatWidget';

export default function PropertiesListPage() {
    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
                All Properties
            </Typography>
            <PropertyTable />
            <ChatWidget />
        </Box>
    );
}
