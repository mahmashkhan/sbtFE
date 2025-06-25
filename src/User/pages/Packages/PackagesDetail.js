import React, { useEffect, useState } from 'react';
import { getPackagesByCategory } from '../../../api/PackagesApi';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  CircularProgress,
  Chip,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Headers from "../../components/Headers";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet";

export default function PackagesDetail() {
  const { slug } = useParams();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await getPackagesByCategory(slug);
        setPackages(response);
        setName(response[0].category);
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, [slug]);

  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
        bgcolor: '#000'
      }}>
        <CircularProgress size={60} thickness={4} sx={{ color: '#E53935' }} />
      </Box>
    );
  }

  if (!packages.length) {
    return (
      <>
        <Helmet><title>Packages</title></Helmet>
        <Headers />
        <Box sx={{ textAlign: 'center', mt: 12, py: 8, bgcolor: '#000' }}>
          <Typography variant="h5" sx={{ color: '#fff', fontWeight: 600 }}>
            No packages found for "{slug}"
          </Typography>
        </Box>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet><title>{name} Packages</title></Helmet>
      <Headers />
      <Box sx={{
        px: { xs: 2, sm: 4, md: 6 },
        minHeight: '100vh',
        bgcolor: '#000',
        color: '#fff'
      }}>
        <Box textAlign="center">
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: '#fff',
              position: 'relative',
              display: 'inline-block',
              mt: 4,
              mb: 8,
              pb: 1,
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60%',
                height: '4px',
                backgroundColor: 'rgb(139, 18, 18)',
                borderRadius: 2,
              },
            }}
          >
            {name}
          </Typography>
        </Box>

        <Grid container spacing={2} justifyContent="center">
          {packages.map((pkg) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={pkg._id}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 4,
              }}
            >
              <Card
                elevation={8}
                sx={{
                  width: {
                    xs: '100%',
                    sm: 320,
                    md: 400,
                  },
                  height: {
                    xs: '100%',
                    sm: 400,
                    md: 460,
                  },
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
      <Footer />
    </>
  );
}
