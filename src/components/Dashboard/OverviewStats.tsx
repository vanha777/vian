'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { useTheme } from '@mui/material/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import BuildIcon from '@mui/icons-material/Build';
import StarIcon from '@mui/icons-material/Star';

export default function OverviewStats() {
    const theme = useTheme();

    return (
        <Box sx={{ flexGrow: 1, width: '100%' }}>
            <Grid container spacing={3}>
                {/* Revenue Chart */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ p: 3, height: '100%', borderRadius: '24px', boxShadow: '0px 4px 20px rgba(0,0,0,0.05)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                            <Box sx={{ p: 1, borderRadius: '12px', bgcolor: 'primary.light', color: 'primary.main', display: 'flex' }}>
                                <TrendingUpIcon />
                            </Box>
                            <Typography variant="h6" fontWeight="bold">Revenue Trend</Typography>
                        </Box>
                        <Box sx={{ height: 300, width: '100%' }}>
                            <LineChart
                                series={[
                                    { data: [4000, 3000, 2000, 2780, 1890, 2390, 3490], area: true, color: theme.palette.primary.main },
                                ]}
                                xAxis={[{ scaleType: 'point', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] }]}
                                sx={{
                                    '.MuiLineElement-root': { strokeWidth: 4 },
                                    '.MuiAreaElement-root': { fillOpacity: 0.3 },
                                }}
                            />
                        </Box>
                    </Card>
                </Grid>

                {/* Occupancy Chart */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ p: 3, height: '100%', borderRadius: '24px', boxShadow: '0px 4px 20px rgba(0,0,0,0.05)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                            <Box sx={{ p: 1, borderRadius: '12px', bgcolor: 'secondary.light', color: 'secondary.main', display: 'flex' }}>
                                <PeopleIcon />
                            </Box>
                            <Typography variant="h6" fontWeight="bold">Occupancy Rate</Typography>
                        </Box>
                        <Box sx={{ height: 300, width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            { id: 0, value: 85, label: 'Occupied', color: theme.palette.success.main },
                                            { id: 1, value: 15, label: 'Vacant', color: theme.palette.error.light },
                                        ],
                                        innerRadius: 80,
                                        outerRadius: 120,
                                        paddingAngle: 5,
                                        cornerRadius: 5,
                                    },
                                ]}
                                slotProps={{
                                    legend: { hidden: true } as any,
                                }}
                            />
                            <Box sx={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 300 }}>
                                <Typography variant="h4" fontWeight="bold">85%</Typography>
                                <Typography variant="body2" color="text.secondary">Occupied</Typography>
                            </Box>
                        </Box>
                    </Card>
                </Grid>

                {/* Maintenance Requests */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ p: 3, height: '100%', borderRadius: '24px', boxShadow: '0px 4px 20px rgba(0,0,0,0.05)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                            <Box sx={{ p: 1, borderRadius: '12px', bgcolor: 'warning.light', color: 'warning.main', display: 'flex' }}>
                                <BuildIcon />
                            </Box>
                            <Typography variant="h6" fontWeight="bold">Maintenance Requests</Typography>
                        </Box>
                        <Box sx={{ height: 300, width: '100%' }}>
                            <BarChart
                                series={[
                                    { data: [3, 4, 1, 6, 5], color: theme.palette.warning.main, label: 'Pending' },
                                    { data: [12, 15, 10, 8, 14], color: theme.palette.success.light, label: 'Resolved' },
                                ]}
                                xAxis={[{ scaleType: 'band', data: ['Plumbing', 'Electrical', 'HVAC', 'General', 'Appliance'] }]}
                                borderRadius={8}
                            />
                        </Box>
                    </Card>
                </Grid>

                {/* Tenant Satisfaction */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ p: 3, height: '100%', borderRadius: '24px', boxShadow: '0px 4px 20px rgba(0,0,0,0.05)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                            <Box sx={{ p: 1, borderRadius: '12px', bgcolor: 'info.light', color: 'info.main', display: 'flex' }}>
                                <StarIcon />
                            </Box>
                            <Typography variant="h6" fontWeight="bold">Tenant Satisfaction</Typography>
                        </Box>
                        <Box sx={{ height: 300, width: '100%' }}>
                            <LineChart
                                series={[
                                    { data: [4.2, 4.3, 4.5, 4.4, 4.6, 4.7, 4.8], curve: 'natural', color: theme.palette.info.main },
                                ]}
                                xAxis={[{ scaleType: 'point', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] }]}
                                sx={{
                                    '.MuiLineElement-root': { strokeWidth: 4 },
                                }}
                            />
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
