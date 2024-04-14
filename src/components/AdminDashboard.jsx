import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Box, Button } from '@mui/material';
import MetricCard from './MetricCard';
import Graph from './Graph';
import ToolList from './ToolList';
import { Navigate} from "react-router-dom";


const AdminDashboard = () => {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('http://16.16.90.16/synapseed/api/actions/metrics.php');
        if (!response.ok) {
          throw new Error('Failed to fetch metrics data');
        }
        const data = await response.json();
        setMetrics(data); 
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };

    fetchMetrics(); 
  }, []);

  const userTools = [
    { label: 'Group Chat Room', onClick: () => window.location.href = '/chat'},
    { label: 'User Profile', onClick: () => window.location.href = '/profile' },
  ]; 

  const moderationTools = [
    { label: 'View Papers', onClick: () => window.location.href = '/details'},
    { label: 'View Uploads', onClick: () => window.location.href = '/upload'},
  ];

  return (
    <Container maxWidth="lg">
      {/* Main Content */}
      <Box sx={{ display: 'flex', flexDirection: 'flexGrow', minHeight: '100vh' }}>
        {/* Content */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={4}>
            {/* Overview Section */}
            <Grid item xs={12} md={6}>
              <Box bgcolor="#f9f9f9" p={3} borderRadius={8} boxShadow={2}>
                <Typography variant="h5" gutterBottom sx={{ color: '#555' }}>
                  Overview
                </Typography>
                <Grid container spacing={2}>
                  {metrics.map((metric, index) => (
                    <Grid item key={index} xs={12} sm={4}>
                      <MetricCard title={metric.name} value={metric.value} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>

            {/* User Management Section */}
            <Grid item xs={12} md={6}>
              <Box bgcolor="#f9f9f9" p={3} borderRadius={8} boxShadow={2}>
                <Typography variant="h5" gutterBottom sx={{ color: '#555' }}>
                  User Management
                </Typography>
                <Grid container spacing={2}>
                  {userTools.map((tool, index) => (
                    <Grid item key={index} xs={12}>
                      <Button
                        color="inherit"
                        variant="outlined"
                        fullWidth
                        onClick={tool.onClick}
                        sx={{
                          backgroundColor: '#800000',
                          color: '#FFFFFF',
                          '&:hover': { backgroundColor: '#5b0000' },
                        }}
                      >
                        {tool.label}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>

            {/* Content Moderation Section */}
            <Grid item xs={12}>
              <Box bgcolor="#f9f9f9" p={3} borderRadius={8} boxShadow={2}>
                <Typography variant="h5" gutterBottom sx={{ color: '#555' }}>
                  Content Moderation
                </Typography>
                <Grid container spacing={2}>
                  {moderationTools.map((tool, index) => (
                    <Grid item key={index} xs={12}>
                      <Button
                        color="inherit"
                        variant="outlined"
                        fullWidth
                        onClick={tool.onClick}
                        sx={{
                          backgroundColor: '#800000',
                          color: '#FFFFFF',
                          '&:hover': { backgroundColor: '#5b0000' },
                        }}
                      >
                        {tool.label}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>

            {/* Analytics Section */}
            <Grid item xs={12}>
              <Box bgcolor="#f9f9f9" p={3} borderRadius={8} boxShadow={2}>
                <Typography variant="h5" gutterBottom sx={{ color: '#555' }}>
                  Analytics
                </Typography>
                <Graph data={metrics} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
