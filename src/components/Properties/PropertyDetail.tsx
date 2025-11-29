'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';
import { PROPERTIES, TENANTS } from '@/lib/mockData';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ py: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

interface PropertyDetailProps {
    propertyId: string;
}

export default function PropertyDetail({ propertyId }: PropertyDetailProps) {
    const router = useRouter();
    const [value, setValue] = React.useState(0);

    const property = PROPERTIES.find((p) => p.id === propertyId);
    const propertyTenants = TENANTS.filter((t) => t.propertyId === propertyId);

    if (!property) {
        return <Box sx={{ p: 3 }}>Property not found</Box>;
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto' }}>
            {/* Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box sx={{ display: 'flex', gap: 3 }}>
                    <Avatar
                        src={property.image}
                        variant="rounded"
                        sx={{ width: 120, height: 120, borderRadius: '20px' }}
                    />
                    <Box>
                        <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                            {property.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, color: 'text.secondary' }}>
                            <LocationOnIcon fontSize="small" />
                            <Typography variant="body1">{property.address}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Chip
                                label={property.status}
                                color={property.status === 'Good' ? 'success' : property.status === 'Warning' ? 'warning' : 'error'}
                                sx={{ borderRadius: '8px', fontWeight: 600 }}
                            />
                            <Chip
                                label={`${property.occupied}/${property.units} Units Occupied`}
                                variant="outlined"
                                sx={{ borderRadius: '8px', fontWeight: 600 }}
                            />
                        </Box>
                    </Box>
                </Box>
                <Button
                    startIcon={<EditIcon />}
                    variant="outlined"
                    onClick={() => router.push(`/properties/${property.id}/edit`)}
                >
                    Edit Property
                </Button>
            </Box>

            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="property tabs">
                    <Tab label="Overview" />
                    <Tab label="Tenants" />
                    <Tab label="Agreements" />
                    <Tab label="Maintenance" />
                </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Card sx={{ p: 3, mb: 3 }}>
                            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Description</Typography>
                            <Typography variant="body1" color="text.secondary" paragraph>
                                Modern residential complex featuring state-of-the-art amenities.
                                Located in a prime area with easy access to public transport and shopping centers.
                                Recently renovated with energy-efficient appliances and smart home features.
                            </Typography>
                        </Card>
                        <Card sx={{ p: 3 }}>
                            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Financial Overview</Typography>
                            <Box sx={{ display: 'flex', gap: 4 }}>
                                <Box>
                                    <Typography variant="body2" color="text.secondary">Monthly Revenue</Typography>
                                    <Typography variant="h5" fontWeight="bold">${property.revenue.toLocaleString()}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body2" color="text.secondary">Expenses</Typography>
                                    <Typography variant="h5" fontWeight="bold">$12,450</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body2" color="text.secondary">Net Income</Typography>
                                    <Typography variant="h5" fontWeight="bold" color="success.main">
                                        ${(property.revenue - 12450).toLocaleString()}
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Card sx={{ p: 3 }}>
                            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Property Details</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography color="text.secondary">Type</Typography>
                                    <Typography fontWeight="500">Residential</Typography>
                                </Box>
                                <Divider />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography color="text.secondary">Year Built</Typography>
                                    <Typography fontWeight="500">2018</Typography>
                                </Box>
                                <Divider />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography color="text.secondary">Total Area</Typography>
                                    <Typography fontWeight="500">45,000 sq ft</Typography>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
                <Card sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>Current Tenants</Typography>
                    <Grid container spacing={2}>
                        {propertyTenants.length > 0 ? (
                            propertyTenants.map((tenant) => (
                                <Grid size={{ xs: 12, md: 6 }} key={tenant.id}>
                                    <Card variant="outlined" sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar>{tenant.name[0]}</Avatar>
                                            <Box>
                                                <Typography fontWeight="600">{tenant.name}</Typography>
                                                <Typography variant="body2" color="text.secondary">Unit {tenant.unit}</Typography>
                                            </Box>
                                        </Box>
                                        <Button size="small" onClick={() => router.push(`/tenants/${tenant.id}`)}>View Profile</Button>
                                    </Card>
                                </Grid>
                            ))
                        ) : (
                            <Typography color="text.secondary" sx={{ p: 2 }}>No tenants found for this property.</Typography>
                        )}
                    </Grid>
                </Card>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={2}>
                <Typography color="text.secondary">Lease agreements and documents will appear here.</Typography>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={3}>
                <Typography color="text.secondary">Maintenance requests and history will appear here.</Typography>
            </CustomTabPanel>
        </Box>
    );
}
