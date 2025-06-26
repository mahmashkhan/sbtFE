// src/pages/PrivacyPolicy.jsx
import React from 'react';
import {  Container, Typography } from '@mui/material';
import Headers from '../../components/Headers';
import Footer from '../../components/Footer';
import { Helmet } from 'react-helmet';

const PrivacyPolicy = () => (
  <>
    <Helmet>
      <title>Privacy Policy</title>
    </Helmet>
    <Headers />
    <Container sx={{ py: 6, minHeight: '100vh', color: '#fff' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>Privacy Policy</Typography>
      <Typography paragraph>Effective Date: June 26, 2025</Typography>
      <Typography paragraph>
        At ShotsByTaha ("SBT", "we", "us", or "our"), your privacy is a top priority. This Privacy Policy outlines how we collect, use, and protect your personal data when you use our website or services related to videography, photography, and web development.
      </Typography>
      <Typography variant="h6">1. Information We Collect</Typography>
      <ul>
        <li>Personal Information: Name, email, phone number (only when voluntarily submitted).</li>
        <li>Service Information: Project details related to video, photo, or web development.</li>
        <li>Technical Data: IP, browser, location, device type.</li>
        <li>Cookies: Used for analytics and improving experience.</li>
      </ul>
      <Typography variant="h6">2. How We Use the Information</Typography>
      <ul>
        <li>To manage projects and communications.</li>
        <li>To improve website functionality and offerings.</li>
      </ul>
      <Typography variant="h6">3. Sharing Information</Typography>
      <Typography paragraph>We do not sell your data. We may share it with trusted partners (e.g., payment processors).</Typography>
      <Typography variant="h6">4. Your Rights</Typography>
      <Typography paragraph>You may access, update, delete your data or opt out of communications anytime.</Typography>
      <Typography variant="h6">5. Data Protection</Typography>
      <Typography paragraph>We implement reasonable security measures to protect your data.</Typography>
      <Typography variant="h6">6. Changes</Typography>
      <Typography paragraph>We may revise this policy. Latest version will always be on our website.</Typography>
      <Typography variant="h6">7. Contact</Typography>
      <Typography paragraph>📧 contact@shotsbytaha.com</Typography>
    </Container>
    <Footer />
  </>
);

export default PrivacyPolicy;