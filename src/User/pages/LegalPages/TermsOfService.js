import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Headers from '../../components/Headers';
import Footer from '../../components/Footer';
import { Helmet } from 'react-helmet';

const TermsOfService = () => (
  <>
    <Helmet>
      <title>Terms of Service</title>
    </Helmet>
    <Headers />
    <Container sx={{ py: 6, minHeight: '100vh', color: '#fff' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>Terms of Service</Typography>
      <Typography paragraph>Effective Date: June 26, 2025</Typography>
      <Typography variant="h6">1. Services Offered</Typography>
      <ul>
        <li>Videography: Events, commercials, reels</li>
        <li>Photography: Weddings, portraits, products</li>
        <li>Web Development: Portfolios, business sites</li>
      </ul>
      <Typography variant="h6">2. User Responsibilities</Typography>
      <Typography paragraph>Do not misuse our services or disrupt our platform.</Typography>
      <Typography variant="h6">3. Project Terms</Typography>
      <ul>
        <li>Deposit may be required</li>
        <li>Revisions and timelines agreed per project</li>
      </ul>
      <Typography variant="h6">4. Intellectual Property</Typography>
      <Typography paragraph>Deliverables are owned by SBT until full payment is received.</Typography>
      <Typography variant="h6">5. Limitation of Liability</Typography>
      <Typography paragraph>We are not liable for indirect or consequential damages.</Typography>
      <Typography variant="h6">6. Disputes</Typography>
      <Typography paragraph>Handled under Karachi, Pakistan jurisdiction.</Typography>
      <Typography variant="h6">7. Updates</Typography>
      <Typography paragraph>We may update these terms at any time.</Typography>
      <Typography variant="h6">8. Contact</Typography>
      <Typography paragraph>📧 contact@shotsbytaha.com</Typography>
    </Container>
    <Footer />
  </>
);

export default TermsOfService;