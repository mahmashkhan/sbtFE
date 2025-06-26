import React from 'react';
import { Box, Grid, Card, Typography } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

export default function Packages() {
  React.useEffect(() => {
    AOS.init({
      duration: 1400,
      easing: 'ease-in-out-quart',
      once: true,
      mirror: false,
      offset: 120,
      delay: 100,
    });
  }, []);

  const navigate = useNavigate();

  const packages = [
    { title: "Restaurant and Cafes", slug: "food" },
    { title: "Fashion and Clothing Brands", slug: "fashion" },
    { title: "Event Coverage", slug: "event" },
    { title: "Ecommerce/Products Brands", slug: "products" },
  ];

  return (
    <>
      <Grid container spacing={8} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={8}>
          <Box textAlign="center" mb={6} data-aos="zoom-in" data-aos-delay="100">
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                fontSize: {
                  xs: '1.4rem',
                  sm: '1.8rem',
                  md: '2.4rem',
                  lg: '3rem',
                },
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: '#ffffff',
                position: 'relative',
                display: 'inline-block',
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
              data-aos="fade-down"
              data-aos-delay="200"
            >
              Packages
            </Typography>



            <Typography
              variant="subtitle2"
              sx={{
                mt: 2,
                color: 'grey.400',
                maxWidth: 600,
                mx: 'auto',
              }}
              data-aos="fade-up"
              data-aos-delay="400"
            >
              We provide budget packages for our customers
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, mb: 6, bgcolor: '#000000' }}>
        <Grid container spacing={{ xs: 2, sm: 3 }} justifyContent="center">
          {packages.map((pkg, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>

              <Card
                data-aos="fade-up"
                data-aos-delay={200 + index * 100}
                data-aos-duration="1000"
                data-aos-once="true"
                sx={{
                  width: 280,
                  height: 200,
                  borderRadius: 8,
                  background: '#1A1A1A',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  px: 3,
                  py: 4,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05) translateY(-6px)',
                    boxShadow: '0 6px 16px rgba(255, 120, 120, 0.3)',
                    borderColor: 'rgb(139, 18, 18)',
                  },
                }}
                onClick={() => navigate(`/packages/${pkg.slug}`)}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: 'rgb(139, 18, 18)',
                    fontWeight: 600,
                    letterSpacing: 1.5,
                    mb: 1,
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: '#fff',
                    },
                  }}
                >
                  Package For
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    fontSize: {
                      xs: '1.4rem',
                      sm: '1.8rem',
                      md: '1.5rem',
                      lg: '1.5rem',
                    },
                    color: '#fff',
                    mb: 1.5,
                    lineHeight: 1.2,
                    transition: 'transform 0.3s ease, color 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      color: 'rgb(255, 120, 120)',
                    },
                  }}
                >
                  {pkg.title}
                </Typography>

                <Box
                  sx={{
                    height: 3,
                    width: 50,
                    background: 'rgb(139, 18, 18)',
                    borderRadius: 2,
                    mb: 1,
                    transition: 'width 0.3s ease, background-color 0.3s ease',
                    '&:hover': {
                      width: 60,
                      background: '#fff',
                    },
                  }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>


    </>
  );
}
// This code defines a React component that displays a list of packages with a title and description.
// It uses Material-UI components for layout and styling, and AOS for animations.