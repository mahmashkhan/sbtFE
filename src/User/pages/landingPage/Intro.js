import React from 'react';
import { Grid, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import EventIcon from '@mui/icons-material/Event';
import AOS from 'aos'
// StyledCard wrapper (for structure and spacing)
// CardWrapper updated
const CardWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  color: 'white',
  textAlign: 'center',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  width: 300,
  height: 300,
  margin: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  border: '2px solid #666',
  [theme.breakpoints.down('sm')]: {
    width: 280,
    height: 280,
  },
}));



// Overlay to darken the image
const Overlay = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Light black overlay
  zIndex: 1,
}));

// Content above the overlay
const CardContentWrapper = styled(CardContent)(() => ({
  position: 'relative',
  zIndex: 2,
}));

// Icon styling
const IconWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& svg': {
    fontSize: 60,
    color: 'white',
  },
}));

const ServicesSection = () => {
  React.useEffect(() => {
    AOS.init({
      duration: 1400, // Longer duration for elegant transitions
      easing: 'ease-in-out-quart', // Smoother, modern easing
      once: true, // Animate only once on scroll
      mirror: false, // No animation on scroll back
      offset: 120, // Trigger animations slightly earlier
      delay: 100, // Base delay for staggered effects
    });
  }, []);
  const services = [
    {
      icon: <RestaurantMenuIcon />,
      title: 'Restaurants & Cafés',
      imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=crop&h=500&w=500'
    },
    {
      icon: <CheckroomIcon />,
      title: 'Clothing/Fashion Brands',
      imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?crop=entropy&cs=tinysrgb&fit=crop&h=500&w=500'
    },
    {
      icon: <ShoppingCartCheckoutIcon />,
      title: 'E-commerce/Product Brands',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1661405432649-3ae63605a463?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FydHxlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      icon: <EventIcon />,
      title: 'Event Coverage',
      imageUrl: 'https://images.unsplash.com/photo-1503428593586-e225b39bddfe?crop=entropy&cs=tinysrgb&fit=crop&h=500&w=500',
    },
  ];

  return (
    <Box sx={{ padding: { xs: 2, md: 4 } }}>
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
            mt: 4,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: '#ffffff', // or a theme-based primary color
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
              backgroundColor: 'rgb(139, 18, 18) ',
              borderRadius: 2,
            },
          }}
          data-aos="fade-down"
          data-aos-delay="200"
        >
          OUR NICHE
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            mt: 1,
            color: 'grey.400',
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          Explore our specialized areas where creativity meets execution.
        </Typography>
      </Box>

      <Grid container spacing={3} justifyContent="center" >
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} data-aos="fade-up"
            data-aos-delay="300">
            <CardWrapper
              sx={{
                backgroundImage: `url(${service.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >

              <Overlay />
              <CardContentWrapper>
                <IconWrapper>{service.icon}</IconWrapper>
                <Typography sx={{ fontWeight: 'bold' }} variant="h5" component="h3" gutterBottom>
                  {service.title}
                </Typography>

              </CardContentWrapper>
            </CardWrapper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ServicesSection;
