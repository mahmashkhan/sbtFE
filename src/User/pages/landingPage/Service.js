import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import SocialDistanceIcon from '@mui/icons-material/SocialDistance';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalSeeIcon from '@mui/icons-material/LocalSee';
import VideocamIcon from '@mui/icons-material/Videocam';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from "react-router-dom";

const services = [
  {
    title: "Video Production Services",
    icon: <VideocamIcon fontSize="large" />,
  },
  {
    title: "Photography",
    icon: <LocalSeeIcon fontSize="large" />,
  },
  {
    title: "Social Media Management",
    icon: <SocialDistanceIcon fontSize="large" />,
  },
];

const Services = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    AOS.init({
      duration: 800,
      offset: 80,
      once: true,
    });
  }, []);

  return (
    <Box sx={{ py: 8 }}>
      <Container>
        {/* Header */}
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Box textAlign="center" mb={6}>
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
                data-aos="fade-up"
              >
                Services
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, mt: 2 }}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                WE'RE PASSIONATE ABOUT VIDEO
              </Typography>

              <Typography
                variant="subtitle2"
                sx={{
                  mt: 1,
                  color: 'grey.600',
                  maxWidth: 600,
                  mx: 'auto',
                }}
                data-aos="fade-up"
                data-aos-delay="200"
              >
                With expert videography and post-production, we bring your story to life—frame by frame.
              </Typography>
            </Box>
          </Grid>
        </Grid>


        <Grid container spacing={4} justifyContent="center">
          {services.map((service, index) => (
            <Grid
              key={index}
              item
              xs={12}
              sm={6}
              md={4}
              display="flex"
              justifyContent="center"
            >
              <Box
                onClick={() => navigate('/services')}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                sx={{
                  width: 300,
                  height: 120,
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: '16px',
                  p: 3,
                  bgcolor: "rgba(0, 0, 0, 0.85)",
                  cursor: "pointer",
                  transition: 'all 0.3s ease',
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.4)',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom right, rgba(75,5,5,0.3), transparent)',
                    zIndex: 0,
                  },
                  "&:hover": {
                    borderColor: "rgb(200,0,0)",
                    boxShadow: `0 0 20px rgba(255, 0, 0, 0.4)`,
                    transform: 'translateY(-5px) scale(1.02)',
                  },
                }}
              >
                <Box sx={{ color: "rgb(139, 18, 18)", fontSize: 32, zIndex: 1 }}>
                  {service.icon}
                </Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  sx={{
                    color: '#fff',
                    textAlign: 'center',
                    zIndex: 1,
                    letterSpacing: 0.5,
                  }}
                >
                  {service.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* More Button */}
        <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography
            sx={{
              m: 3,
              color: "rgb(139, 18, 18)",
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              fontWeight: 500,
              transition: 'color 0.3s',
              '&:hover': {
                color: 'rgb(192, 12, 12)',
              },
            }}
            onClick={() => navigate('/services')}
          >
            More <ArrowForwardIcon sx={{ ml: 0.5 }} />
          </Typography>
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;
