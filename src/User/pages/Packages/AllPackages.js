import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  Box,
  Divider,
  CircularProgress,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { getPackages } from '../../../api/PackagesApi';
import Header from '../../components/Headers'
import Footer from '../../components/Footer'

export default function AllPackages() {
  const [groupedPackages, setGroupedPackages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getPackages();
        const grouped = data.reduce((acc, pkg) => {
          if (!acc[pkg.category]) acc[pkg.category] = [];
          acc[pkg.category].push(pkg);
          return acc;
        }, {});
        setGroupedPackages(grouped);
      } catch (error) {
        console.error('Failed to fetch packages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress sx={{ color: '#8B1212' }} />
      </Box>
    );
  }

  return (
    <>
    <Header/>
    <Box sx={{ px: { xs: 2, sm: 4 }, py: 6, backgroundColor: '#121212', minHeight: '100vh' }}>
      {Object.entries(groupedPackages).map(([category, packages]) => (
        <Box key={category} sx={{ mb: 6 }}>
          {/* Category Title */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              textAlign: 'center',
              color: '#fff',
              textTransform: 'uppercase',
              letterSpacing: 1,
              mb: 1,
            }}
          >
            {category}
          </Typography>

          {/* Divider */}
          <Divider
            sx={{
              width: 180,
              height: 4,
              background: 'linear-gradient(90deg, #8B1212, #E53935)',
              mx: 'auto',
              mb: 4,
              borderRadius: 2,
            }}
          />

          {/* Packages under this category */}
          <Grid container spacing={2} justifyContent="center">
            {packages.map((pkg) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={pkg._id}
                sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}
              >
                <Card
                  elevation={8}
                  sx={{
                    width: { xs: '100%', sm: 320, md: 400 },
                    height: { xs: '100%', sm: 400, md: 460 },
                    borderRadius: '16px',
                    transition: 'all 0.3s ease-in-out',
                    position: 'relative',
                    overflow: 'visible',
                    bgcolor: 'rgba(0, 0, 0, 0.85)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      transform: 'translateY(-6px) scale(1.02)',
                      borderColor: '#8B1212',
                      boxShadow: '0 0 16px rgba(255, 0, 0, 0.4)',
                    },
                  }}
                >
                  <Chip
                    label={`PKR ${pkg.price}`}
                    sx={{
                      position: 'absolute',
                      top: -16,
                      right: 16,
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      px: 2,
                      py: 2.5,
                      borderRadius: '12px',
                      background: 'linear-gradient(90deg, #8B1212, #E53935)',
                      color: '#fff',
                    }}
                  />
                  <CardContent sx={{ pt: 6, pb: 4 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        mb: 3,
                        fontWeight: 700,
                        textAlign: 'center',
                        textTransform: 'capitalize',
                        letterSpacing: '0.5px',
                        color: '#fff',
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
                            borderLeft: '4px solid rgb(139, 18, 18)',
                            mb: 0.5,
                            borderRadius: '0 8px 8px 0',
                            backgroundColor: 'rgba(139, 18, 18, 0.07)',
                            transition: 'background-color 0.2s',
                            '&:hover': {
                              backgroundColor: 'rgba(139, 18, 18, 0.15)',
                            },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircleOutlineIcon
                              sx={{ color: '#E53935', fontSize: '1.2rem' }}
                            />
                          </ListItemIcon>
                          <Typography sx={{ fontSize: '0.95rem', color: '#fff' }}>
                            {feature}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
    <Footer/>
    </>
  );
}
