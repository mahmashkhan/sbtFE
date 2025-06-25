import React, { useState, useEffect } from 'react';
import AdminLayout from '../../pages/AdminLayout';
import { getPackages, deletePackage } from '../../../api/PackagesApi';
import {
  Typography,
  ListItemIcon,
  ListItem,
  List,
  CardContent,
  Chip,
  Card,
  Grid,
  Box,
  Button,
  Divider,
  CircularProgress,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Modal from '../Modal';
import { useNavigate } from 'react-router-dom';

export default function MyPackages() {
  const [groupedPackages, setGroupedPackages] = useState({});
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await getPackages();
      const grouped = response.reduce((acc, pkg) => {
        if (!acc[pkg.category]) {
          acc[pkg.category] = [];
        }
        acc[pkg.category].push(pkg);
        return acc;
      }, {});
      setGroupedPackages(grouped);
    } catch (error) {
      console.error('Error fetching packages:', error);
      setError('Failed to load packages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleDelete = async () => {
    try {
      await deletePackage(id);
      setGroupedPackages((prev) => {
        const updated = { ...prev };
        for (const category in updated) {
          updated[category] = updated[category].filter((pkg) => pkg._id !== id);
          if (updated[category].length === 0) {
            delete updated[category];
          }
        }
        return updated;
      });
      setId(null);
      setOpen(false);
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleOpenModal = (id) => {
    setId(id);
    setOpen(true);
  };

  if (loading) {
    return (
      <AdminLayout>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50vh',
            bgcolor: '#000000',
          }}
        >
          <CircularProgress size={60} thickness={4} sx={{ color: '#42a5f5' }} />
        </Box>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <Box sx={{ textAlign: 'center', mt: 12, py: 8, bgcolor: '#000000' }}>
          <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 600 }}>
            {error}
          </Typography>
        </Box>
      </AdminLayout>
    );
  }

  if (!Object.keys(groupedPackages).length) {
    return (
      <AdminLayout>
        <Box sx={{ textAlign: 'center', mt: 12, py: 8, bgcolor: '#000000' }}>
          <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 600 }}>
            No packages available
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/admin/add/packages')}
            sx={{
              mt: 2,
              bgcolor: '#42a5f5',
              '&:hover': { bgcolor: '#1976d2' },
              textTransform: 'none',
              fontWeight: 'bold',
            }}
          >
            Add Package
          </Button>
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Box sx={{ px: { xs: 2, sm: 4 }, py: 8, minHeight: '100vh' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/admin/add/packages')}
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
          >
            Add Package
          </Button>
        </Box>

        {Object.entries(groupedPackages).map(([category, packages]) => (
          <Box key={category} sx={{ mb: 6, mt: 2 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-0.5px',
                mb: 2,
                fontSize: { xs: '1.5rem', sm: '2rem' },
              }}
            >
              {category}
            </Typography>
            <Divider
              sx={{
                width: '120px',
                height: '5px',
                background: 'linear-gradient(90deg, #42a5f5, #bbdefb)',
                mb: 4,
                borderRadius: 4,
              }}
            />

            <Grid container spacing={4}>
              {packages.map((pkg) => (
                <Grid item xs={12} sm={6} md={4} key={pkg._id}>
                  <Card
                    elevation={8}
                    sx={{
                      height: "100%",
                      width: '100%',
                      maxWidth: 400,
                      mx: 'auto',
                      borderRadius: '16px',
                      transition: 'all 0.3s ease-in-out',
                      position: 'relative',
                      overflow: 'visible',
                    }}
                  >
                    <Chip
                      label={`PKR ${pkg.price ?? 'N/A'}`}
                      sx={{
                        position: 'absolute',
                        top: -16,
                        right: 16,
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        px: 2,
                        py: 2.5,
                        borderRadius: '12px',
                        background: 'linear-gradient(90deg, #42a5f5, #bbdefb)',
                        color: '#000000',
                      }}
                    />
                    <CardContent sx={{ pt: 6, pb: 4 }}>
                      <Typography
                        variant="h5"
                        sx={{
                          mb: 3,
                          fontWeight: 700,
                          color: '#ffffff',
                          textAlign: 'center',
                          textTransform: 'capitalize',
                          letterSpacing: '0.5px',
                        }}
                      >
                        {pkg.type} Package
                      </Typography>
                      <List dense>
                        {pkg.features.map((feature, idx) => (
                          <ListItem
                            key={idx}
                            sx={{
                              py: 1.5,
                              px: 2,
                              borderLeft: '3px solid #42a5f5',
                              mb: 0.5,
                              backgroundColor: 'rgba(66, 165, 245, 0.1)',
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <CheckCircleOutlineIcon
                                sx={{ color: '#42a5f5', fontSize: '1.2rem' }}
                              />
                            </ListItemIcon>
                            <Typography sx={{ fontSize: '0.95rem', color: '#e0e0e0' }}>
                              {feature}
                            </Typography>
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                    <Box sx={{ px: 2, pb: 2 }}>
                      <Button
                        fullWidth
                        variant="outlined"
                        color="error"
                        onClick={() => handleOpenModal(pkg._id)}
                        sx={{
                          textTransform: 'none',
                          borderRadius: '8px',
                          fontWeight: 'bold',
                          borderColor: '#ef5350',
                          color: '#ef5350',
                          '&:hover': {
                            borderColor: '#d32f2f',
                            color: '#d32f2f',
                            backgroundColor: 'rgba(239, 83, 80, 0.1)',
                          },
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
        <Modal open={open} setOpen={setOpen} onDelete={handleDelete} />
      </Box>
    </AdminLayout>
  );
}
