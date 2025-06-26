import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Headers from '../../components/Headers';
import Footer from '../../components/Footer';
import { Helmet } from 'react-helmet';

const LegalNotice = () => (
  <>
    <Helmet>
      <title>Legal Notice</title>
    </Helmet>
    <Headers />
    <Container sx={{ py: 6, minHeight: '100vh', color: '#fff' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>Legal Notice</Typography>
      <Typography paragraph><strong>Website Owner:</strong> Mehmash Khan</Typography>
      <Typography paragraph><strong>Company:</strong> ShotsByTaha (SBT)</Typography>
      <Typography paragraph><strong>Email:</strong> contact@shotsbytaha.com</Typography>
      <Typography paragraph><strong>City:</strong> Karachi, Pakistan</Typography>
      <Typography variant="h6" sx={{ mt: 4 }}>Disclaimer</Typography>
      <Typography paragraph>
        All content, images, and videos on this website are the intellectual property of SBT. Unauthorized use or reproduction is prohibited. We strive to ensure accuracy, but are not responsible for third-party content or external links.
      </Typography>
    </Container>
    <Footer />
  </>
);

export default LegalNotice;