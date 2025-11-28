'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    trend?: string;
    trendColor?: 'success' | 'error' | 'warning';
}

export default function StatsCard({ title, value, icon, trend, trendColor = 'success' }: StatsCardProps) {
    return (
        <Card sx={{ p: 2, display: 'flex', alignItems: 'center', height: '100%' }}>
            <Avatar
                variant="rounded"
                sx={{
                    bgcolor: 'background.default',
                    color: 'primary.main',
                    width: 56,
                    height: 56,
                    mr: 2,
                }}
            >
                {icon}
            </Avatar>
            <Box>
                <Typography variant="body2" color="text.secondary" fontWeight="500">
                    {title}
                </Typography>
                <Typography variant="h4" fontWeight="700" color="text.primary">
                    {value}
                </Typography>
                {trend && (
                    <Typography variant="caption" color={`${trendColor}.main`} fontWeight="500">
                        {trend}
                    </Typography>
                )}
            </Box>
        </Card>
    );
}
