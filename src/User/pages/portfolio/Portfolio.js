import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Container,
  
  
  Grid,
  Divider
} from '@mui/material';
import { fetchPortfolio } from '../../../api/PortfolioApi';
import Header from '../../components/Headers';
import Footer from '../../components/Footer';
import { Helmet } from "react-helmet"

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState([]);
  
 

  useEffect(() => {
    const getPortfolio = async () => {
      const response = await fetchPortfolio();
      if (response) {
        setPortfolio(response);
      }
    };
    getPortfolio();
  }, []);

  return (
    <>
    <Helmet><title>Our Work</title></Helmet>
      <Header />
      <Container maxWidth="lg" >
        <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', m: 4, mb: 6 }}> <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
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
              backgroundColor: 'rgb(139, 18, 18)', // Blue underline (or brand color)
              borderRadius: 2,
            },
          }}
        >
          Our Work
        </Typography>
        </Box>
        {portfolio.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            Loading...
          </Typography>
        ) : (
          portfolio.map((item) => (
            <Box key={item._id} sx={{ mb: 8 }}>
              <Grid container spacing={0} sx={{ alignItems: 'flex-start' }}> {/* Reduced spacing and centered items */}
                {item.video && item.video.length > 0 ? (
                  <Grid size={{ xs: 12, md: 6 }} sx={{ pr: { md: 1 } }}> {/* Reduced padding-right on desktop */}


                    {item.video.map((url, index) => (
                      <Box
                        key={index}
                        sx={{
                          position: 'relative',
                          width: '100%',
                          maxWidth: { xs: '100%', sm: '180px', md: '300px' }, // Kept smaller size
                          aspectRatio: '9 / 16', // Vertical reel aspect ratio
                          overflow: 'hidden',
                          boxShadow: '0 0 8px 2px rgb(179, 21, 21)',
                          mx: 'auto', // Center the reel
                          borderRadius: 2, // Slight rounding for reel aesthetic
                        }}
                      >
                        <iframe
                          src={url}
                          title={`video-${index}`}
                          frameBorder="0"
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            border: 'none',
                          }}
                        />
                      </Box>
                    ))}

                  </Grid>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No videos available.
                  </Typography>
                )}
                <Grid size={{ xs: 12, md: 6 }} sx={{ pl: { md: 1 } }}> {/* Reduced padding-left on desktop */}
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 ,mt:2}}>
                    {item.name}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                    {item.description}
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ my: 4, bgcolor: 'grey.800' }} />
            </Box>


          ))
        )}
      </Container>
      <Footer />
    </>
  );
}