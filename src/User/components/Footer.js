import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        backgroundColor: 'rgb(102, 7, 7)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 6, sm: 8 },
        pb: { xs: 4, sm: 6 },
        px: { xs: 2, sm: 4 },
      }}
    >
      {/* Decorative Circles */}
      <Box
        sx={{
          position: 'absolute',
          width: 200,
          height: 200,
          bgcolor: 'rgb(75,5,5)',
          borderRadius: '50%',
          top: -50,
          right: -50,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: 300,
          height: 300,
          bgcolor: 'rgb(75, 5, 5)',
          borderRadius: '50%',
          bottom: -100,
          left: -100,
          zIndex: 0,
        }}
      />

      <Container sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={6}>
          {/* Brand */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              SBT
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: '#e0e0e0' }}>
              We create digital experiences for brands and companies by using technology.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" sx={{ color: 'white' }}><FacebookIcon /></IconButton>
              <IconButton size="small" sx={{ color: 'white' }}><TwitterIcon /></IconButton>
              <IconButton size="small" sx={{ color: 'white' }}><InstagramIcon /></IconButton>
              <IconButton size="small" sx={{ color: 'white' }}><LinkedInIcon /></IconButton>
            </Stack>
          </Grid>

          {/* Links */}
          <Grid item xs={6} sm={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
              Company
            </Typography>
            {[
              { label: 'Home', path: '/' },
              { label: 'Packages', path: '/packages' },
              { label: 'Services', path: '/services' },
              { label: 'About', path: '/about' },
              { label: 'Contact', path: '/contact' },
              { label: 'Our Employees', path: '/team' }
            ].map(({ label, path }) => (
              <Typography key={label} variant="body2" sx={{ mb: 1 }}>
                <Link href={path} color="inherit" underline="hover">
                  {label}
                </Link>
              </Typography>
            ))}
          </Grid>

          {/* Subscribe */}
          <Grid item xs={12} md={7}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Subscribe to our newsletter
            </Typography>
            <Stack
              direction={isSmall ? "column" : "row"}
              spacing={2}
              alignItems={isSmall ? "stretch" : "center"}
            >
              <Box
                component="input"
                type="email"
                placeholder="Enter your email"
                sx={{
                  p: 1.5,
                  borderRadius: 1,
                  border: '1px solid #ccc',
                  flexGrow: 1,
                  width: isSmall ? '100%' : 'auto',
                  backgroundColor: '#fff',
                  color: '#000',
                }}
              />
              <Box
                component="button"
                sx={{
                  px: 3,
                  py: 1.5,
                  borderRadius: 1,
                  backgroundColor: 'rgb(139, 18, 18)',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  mt: isSmall ? 1 : 0,
                  width: isSmall ? '100%' : 'auto',
                  '&:hover': {
                    backgroundColor: 'rgb(180, 10, 10)',
                  },
                }}
              >
                Subscribe
              </Box>
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Box
          mt={6}
          display="flex"
          justifyContent="space-between"
          flexDirection={isSmall ? "column" : "row"}
          alignItems="center"
          gap={2}
          sx={{
            borderTop: '1px solid #334155',
            pt: 3,
          }}
        >
          <Typography variant="body2" sx={{ color: '#ffbdbd' }}>
            Developed By:{' '}
            <a
              href="https://www.linkedin.com/in/mehmash-khan-909a42251?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
            >
              Mehmash Khan
            </a>
          </Typography>

          <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center">
  {[
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Legal Notice', path: '/legal-notice' },
    { label: 'Terms of Service', path: '/terms-of-service' },
  ].map(({ label, path }, idx) => (
    <Typography variant="body2" key={idx} sx={{ color: '#e0e0e0' }}>
      <Link href={path} color="inherit" underline="hover">
        {label}
      </Link>
    </Typography>
  ))}
</Stack>

        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
