import  { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Container,
  
} from '@mui/material';
import ProfessionalTeamIcon from '@mui/icons-material/People';
import PriceIcon from '@mui/icons-material/AttachMoney';
import ServicesIcon from '@mui/icons-material/Build';
import { getHighlight } from '../../../api/HighlightApi';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const WhyChooseUs = () => {
  const [highlight, setHighlight] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHighlight = async () => {
      try {
        const response = await getHighlight();
        setHighlight(response.data.highlight[0]);
      } catch (error) {
        console.error('Error fetching highlight:', error);
      }
    };

    fetchHighlight();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: 'ease-in-out-quart',
      once: true,
      offset: 120,
      delay: 100,
    });
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        bgcolor: '#000',
        color: '#fff',
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 6, sm: 8, md: 10 },
      }}
    >
      {/* Header */}
      <Box textAlign="center" mb={6} data-aos="fade-down">
        <Typography variant="body1" color="rgb(139, 18, 18)" fontWeight={600}>
          WHY CHOOSE US
        </Typography>
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            fontSize: {
              xs: '1.8rem',
              sm: '2.4rem',
              md: '3rem',
            },
            mt: 1,
          }}
        >
          UNLEASHING CREATIVE VISUAL JOURNEYS
        </Typography>
        <Typography
          variant="body1"
          color="grey.400"
          sx={{
            mt: 2,
            maxWidth: 700,
            mx: 'auto',
            fontSize: { xs: '0.95rem', sm: '1.05rem' },
          }}
        >
          We capture the essence of your story with stunning visuals, cinematic precision, and unmatched creativity.
        </Typography>
      </Box>

      {/* Video */}
      <Box sx={{ textAlign: 'center', mb: 8 }} data-aos="zoom-in-up">
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 960,
            mx: 'auto',
            pt: '56.25%', // 16:9 aspect ratio
          }}
        >
          {highlight && (
            <iframe
              src={highlight}
              title="highlight-video"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: 12,
              }}
            />
          )}
        </Box>
      </Box>

      {/* Features Section */}
      <Grid
        container
        spacing={4}
        justifyContent="center"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {[
          {
            icon: <ProfessionalTeamIcon sx={{ fontSize: 50, color: 'rgb(139, 18, 18)' }} />,
            title: 'PROFESSIONAL TEAM',
            description: 'Our team consists of industry professionals with a creative edge and technical expertise.',
            path: '/team',
          },
          {
            icon: <PriceIcon sx={{ fontSize: 50, color: 'rgb(139, 18, 18)' }} />,
            title: 'AFFORDABLE PRICE',
            description: 'We offer the best services at competitive prices with no compromise on quality.',
            path:'/packages'
           
          },
          {
            icon: <ServicesIcon sx={{ fontSize: 50, color: 'rgb(139, 18, 18)' }} />,
            title: 'MORE SERVICES',
            description: 'From branding to media production, we deliver a wide range of creative services.',
            path: '/services',
          },
        ].map((item, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            sx={{
              px: { xs: 1, sm: 2 },
              py: { xs: 2, sm: 3 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              onClick={() => handleNavigate(item.path)}
              sx={{
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, background-color 0.3s ease',
                borderRadius: '12px',
                p: 2,
                width: '100%',
                maxWidth: 320,
                '&:hover': {
                  transform: 'translateY(-8px)',
                  backgroundColor: 'rgba(255, 0, 0, 0.18)',
                },
              }}
            >
              <Box>{item.icon}</Box>
              <Typography
                variant="subtitle1"
                mt={2}
                fontWeight={700}
                sx={{ color: '#ffffff' }}
              >
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                color="grey.400"
                sx={{
                  mt: 1,
                  maxWidth: 280,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                }}
              >
                {item.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WhyChooseUs;