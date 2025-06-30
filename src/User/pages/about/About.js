import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  
} from '@mui/material';
import Headers from '../../components/Headers';
import { getAbout } from '../../../api/AboutApi';
import Footer from '../../components/Footer';
import AOS from 'aos';
import { Helmet } from 'react-helmet';

const About = () => {
  const [about, setAbout] = useState('');
  const [para2, setPara2] = useState('');
  const [para3, setPara3] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await getAbout();
        setAbout(response.data.para1);
        setPara2(response.data.para2);
        setPara3(response.data.para3);
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
      <Helmet><title>About</title></Helmet>
      <Headers />

      <Box sx={{ minHeight: '100vh', bgcolor: '#0f0f0f', color: '#fff', pt: 6, pb: 10 }}>
        <Container >
          {/* Heading (Unchanged) */}
          <Box textAlign="center" marginBottom='20px'>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
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
            >
              About Us
            </Typography>
          </Box>

          {/* Content Area */}
          {loading ? (
            <Box display="flex" justifyContent="center" mt={6}>
              <CircularProgress sx={{ color: '#E53935' }} />
            </Box>
          ) : (
            <Box
              elevation={4}
              data-aos="fade-up"
              sx={{
                background: 'rgb(0, 0, 0)',
                padding: { xs: 3, sm: 5 },
                border: '2px solid red',
                borderRadius: 3,
                color: '#fff',
                lineHeight: 1.8,
                fontSize: { xs: '1rem', sm: '1.1rem' },
                boxShadow: '0 0 8px 2px rgb(236, 67, 67)',
                transition: '0.3s ease',
              }}
            >
              <Box>
                <Typography variant="body1" textAlign="justify" paragraph sx={{ mb: 2 }}>
                  {about}
                </Typography>
                <Typography variant="body1" textAlign="justify" paragraph sx={{ mb: 2 }}>
                  {para2}
                </Typography>
                <Typography variant="body1" textAlign="justify" paragraph sx={{ mb: 2 }}>
                  {para3}
                </Typography>
              </Box>
            </Box>
          )}
        </Container>
      </Box>
      <Footer />
    </>
  );
};
export default About;
