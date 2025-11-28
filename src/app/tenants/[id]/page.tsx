'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import { useParams, useRouter } from 'next/navigation';
import { TENANTS, PROPERTIES } from '@/lib/mockData';
import ChatWidget from '@/components/Chat/ChatWidget';

export default function TenantPage() {
    const params = useParams();
    const router = useRouter();

    const tenant = TENANTS.find((t) => t.id === params.id);
    const property = tenant ? PROPERTIES.find((p) => p.id === tenant.propertyId) : null;

    if (!tenant) {
        return <Box sx={{ p: 3 }}>Tenant not found</Box>;
    }

    return (
        <Box>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 3 }}>
                <Avatar sx={{ width: 100, height: 100, bgcolor: 'primary.main', fontSize: '2.5rem' }}>
                    {tenant.name[0]}
                </Avatar>
                <Box>
                    <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                        {tenant.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                            label={tenant.status}
                            color={tenant.status === 'Active' ? 'success' : 'error'}
                            sx={{ borderRadius: '8px' }}
                        />
                        <Chip
                            label={`Lease ends: ${tenant.leaseEnd}`}
                            variant="outlined"
                            sx={{ borderRadius: '8px' }}
                        />
                    </Box>
                </Box>
            </Box>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ p: 3, mb: 3 }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Contact Information</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <EmailIcon color="action" />
                                <Typography>{tenant.email}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <PhoneIcon color="action" />
                                <Typography>{tenant.phone}</Typography>
                            </Box>
                        </Box>
                    </Card>

                    <Card sx={{ p: 3 }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Residence</Typography>
                        {property ? (
                            <Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                    <HomeIcon color="action" />
                                    <Box>
                                        <Typography fontWeight="600">{property.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">Unit {tenant.unit}</Typography>
                                    </Box>
                                </Box>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    onClick={() => router.push(`/properties/${property.id}`)}
                                >
                                    View Property
                                </Button>
                            </Box>
                        ) : (
                            <Typography color="text.secondary">Property information unavailable</Typography>
                        )}
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                    <Card sx={{ p: 3, mb: 3 }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Payment History</Typography>
                        <Typography color="text.secondary">Recent payment records will appear here.</Typography>
                    </Card>

                    <Card sx={{ p: 3 }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Documents</Typography>
                        <Typography color="text.secondary">Lease agreements and ID documents.</Typography>
                    </Card>
                </Grid>
            </Grid>

            <ChatWidget />
        </Box>
    );
}
