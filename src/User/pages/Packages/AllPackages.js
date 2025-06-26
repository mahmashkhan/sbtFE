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
  CircularProgress,
  Pagination,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { getPackages } from '../../../api/PackagesApi';
import Header from '../../components/Headers';
import Footer from '../../components/Footer';

export default function AllPackages() {
  const [groupedPackages, setGroupedPackages] = useState({});
  const [loading, setLoading] = useState(true);
  const [pageState, setPageState] = useState({});
  const [categoryPage, setCategoryPage] = useState(1);
  const categoriesPerPage = 2;
  const packagesPerPage = 6;

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

  const handleCategoryPageChange = (event, value) => {
    setCategoryPage(value);
  };

  const handlePackagePageChange = (category) => (event, value) => {
    setPageState((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const allCategories = Object.keys(groupedPackages);
  const totalCategoryPages = Math.ceil(allCategories.length / categoriesPerPage);
  const visibleCategories = allCategories.slice(
    (categoryPage - 1) * categoriesPerPage,
    categoryPage * categoriesPerPage
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          bgcolor: '#000',
        }}
      >
        <CircularProgress size={60} thickness={4} sx={{ color: '#E53935' }} />
      </Box>
    );
  }

  return (
    <>
      <Header />
      <Box
        sx={{
          px: { xs: 2, sm: 4, md: 6 },
          py: 6,
          backgroundColor: '#000',
          minHeight: '100vh',
          color: '#fff',
          width: '100%',
        }}
      >
        {visibleCategories.map((category) => {
          const packages = groupedPackages[category];
          const currentPage = pageState[category] || 1;
          const startIndex = (currentPage - 1) * packagesPerPage;
          const selectedPackages = packages.slice(startIndex, startIndex + packagesPerPage);
          const totalPages = Math.ceil(packages.length / packagesPerPage);

          return (
            <Box key={category} sx={{ mb: 1 }}>
              {/* Heading (Unchanged) */}
              <Box textAlign="center" sx={{ mb: 1 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 'bold',
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    color: '#fff',
                    position: 'relative',
                    display: 'inline-block',
                    mb: 3,
                    pb: 1,
                    fontSize: {
                      xs: '1.4rem',
                      sm: '1.8rem',
                      md: '2.4rem',
                      lg: '3rem',
                    },
                    px: { xs: 1, sm: 0 },
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
                  {category} Packages
                </Typography>
              </Box>

              {/* Cards */}
              <Grid container spacing={2} justifyContent="center">
                {selectedPackages.map((pkg) => (
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
                        width: {
                          xs: 280,
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

              {/* Package Pagination */}
              {totalPages > 1 && (
                <Box display="flex" justifyContent="center" mt={3}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePackagePageChange(category)}
                    sx={{
                      '& .MuiPaginationItem-root': {
                        color: '#fff',
                        borderColor: '#E53935',
                      },
                      '& .Mui-selected': {
                        backgroundColor: '#E53935',
                        color: '#fff',
                      },
                    }}
                  />
                </Box>
              )}
            </Box>
          );
        })}

       


      </Box >
       {/* Category Pagination */}
        {totalCategoryPages > 1 && (
          <Box display="flex" justifyContent="center" m={3}>
            <Pagination
              count={totalCategoryPages}
              page={categoryPage}
              onChange={handleCategoryPageChange}
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#fff',
                  border: '1px solid rgb(139, 18, 18)',
                  backgroundColor: '#000',
                },
                '& .MuiPaginationItem-root:hover': {
                  backgroundColor: 'rgba(139, 18, 18, 0.2)',
                },
                '& .Mui-selected': {
                  backgroundColor: 'rgb(139, 18, 18)',  // ✅ RED background for active page
                  color: '#fff',
                  borderColor: 'rgb(139, 18, 18)',
                },
                '& .Mui-selected:hover': {
                  backgroundColor: 'rgb(139, 18, 18)',
                },
              }}
            />
          </Box>
        )}
      <Footer />
    </>
  );
}
