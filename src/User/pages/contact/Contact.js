// ContactMe.jsx
import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import Headers from '../../components/Headers'
import Footer from '../../components/Footer';
import { contact } from '../../../api/ContactApi'; 
import ContactModal from './ContactModal';


function ContactMe() {
  const [open, setOpen] = React.useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await contact(formData);

      setOpen(true)
      setFormData({ name: '', email: '', message: '' });
      console.log('Response:', result);
    } catch (error) {
      alert('Failed to send message. Please try again.');
    }
  };


  return (
    <>

      <Headers />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', m: 3 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            letterSpacing: 2,
            fontSize: {
              xs: '1.4rem',
              sm: '1.8rem',
              md: '2.4rem',
              lg: '3rem',
            },
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
              backgroundColor: 'rgb(139, 18, 18) ', // Blue underline (or brand color)
              borderRadius: 2,
            },
          }}
        >
          Contact
        </Typography>
      </Box>
      <Box
        sx={{
          maxWidth: 900,
          mx: 'auto',
          py: 3,
          px: 3,
          position: 'relative',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: '#333',
        }}
      >



        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '100%',
            maxWidth: '100%',
            p: { xs: 3, sm: 4 },
            bgcolor: '#000000',
            boxShadow: '0 0 8px 2px rgb(236, 67, 67)',
            borderRadius: 2,

          }}
        >
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              multiline
              rows={4}
              sx={{ mb: 2 }}
            />
          </Box>

          <Box sx={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: 'rgb(139, 18, 18) ',
                color: '#ffffff',
                px: { xs: 3, md: 4 },
                py: 1.5,
                fontWeight: 600,
                borderRadius: 3,

                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: 'rgb(216, 26, 26)',
                  boxShadow: 'white',

                },
                textTransform: 'none',
                fontSize: { xs: '0.9rem', md: '1rem' },
              }}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer />
      <ContactModal open={open} setOpen={setOpen} />
    </>
  );
}

export default ContactMe;