'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import StatsCard from '@/components/Dashboard/StatsCard';
import PropertyTable from '@/components/Dashboard/PropertyTable';
import BusinessIcon from '@mui/icons-material/BusinessRounded';
import PeopleIcon from '@mui/icons-material/PeopleRounded';
import HomeWorkIcon from '@mui/icons-material/HomeWorkRounded';
import AttachMoneyIcon from '@mui/icons-material/AttachMoneyRounded';
import { STATS } from '@/lib/mockData';
import ChatWidget from '@/components/Chat/ChatWidget';

export default function Home() {
  return (
    <Box>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard
            title="Total Properties"
            value={STATS.totalProperties}
            icon={<BusinessIcon fontSize="large" />}
            trend="+12% since last month"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard
            title="Total Tenants"
            value={STATS.totalTenants}
            icon={<PeopleIcon fontSize="large" />}
            trend="+5% since last month"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard
            title="Vacancy Rate"
            value={STATS.vacancyRate}
            icon={<HomeWorkIcon fontSize="large" />}
            trend="-0.5% since last month"
            trendColor="success"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard
            title="Total Revenue"
            value={STATS.totalRevenue}
            icon={<AttachMoneyIcon fontSize="large" />}
            trend="+8% since last month"
          />
        </Grid>
      </Grid>

      <PropertyTable />

      <ChatWidget />
    </Box>
  );
}
