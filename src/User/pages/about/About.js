import  { useEffect, useState } from 'react';
import { Box, Typography, Container, CircularProgress } from '@mui/material';
import Headers from '../../components/Headers';
import { getAbout } from '../../../api/AboutApi';
import Footer from '../../components/Footer';
import AOS from 'aos';
import {Helmet} from 'react-helmet'

const About = () => {
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(true);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1200, // Longer duration for smoother animations
      easing: 'ease-in-out-cubic', // Advanced cubic-bezier easing for natural feel
      once: true, // Animations happen only once on scroll
      mirror: false, // No animation on scroll back
    });
  }, []);
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await getAbout();
        setAbout(response.data.about);
      } catch (error) {
        console.error('Error fetching about content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  return (
    <>
    <Helmet>
      <title>About</title>
    </Helmet>
      <Headers />
      <Box
        sx={{
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="md">
          <Box textAlign="center" >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: '#ffffff', // or a theme-based primary color
                position: 'relative',
                display: 'inline-block',
                m:4,
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
              About Us
            </Typography>

          </Box>

          {loading ? (
            <Box display="flex" justifyContent="center" mt={6}>
              <CircularProgress color="primary" />
            </Box>
          ) : (

            <Typography
              variant="body1"
              data-aos="fade-up"
              data-aos-delay="100"
              sx={{
                color: '#cfd8dc',
                fontSize: '1.1rem',
                lineHeight: 1.8,
                textAlign: 'justify',

                // fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              }}
            >
              {about}
            </Typography>

          )}
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default About;
