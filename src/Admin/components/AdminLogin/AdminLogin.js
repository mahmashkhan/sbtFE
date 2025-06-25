import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
  Grid,
  Avatar,
  Fade
} from '@mui/material';
import { Visibility, VisibilityOff, LockOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate()
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setErrorMsg('Please fill in all fields');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch(`${apiUrl}/api/sbt/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.message || 'Login failed. Please try again.');
      } else {
        // Save token to localStorage
        localStorage.setItem('token', data.token);
      
        navigate('/admin/dashboard');
      }
    } catch (error) {
      setErrorMsg('Login failed. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{

        px: 2,
      }}
    >
      <Fade in timeout={600}>
        <Paper
          elevation={10}
          sx={{
            p: 5,
            maxWidth: 420,
            width: '100%',
            borderRadius: 4,
            textAlign: 'center',
            backdropFilter: 'blur(8px)',

          }}
        >
          <Avatar sx={{ bgcolor: '#1976d2', mx: 'auto', mb: 2 }}>
            <LockOutlined />
          </Avatar>

          <Typography variant="h5" fontWeight="bold" mb={1}>
            SBT Production
          </Typography>
          <Typography variant="h6" color="text.secondary" mb={3}>
            Admin Sign In
          </Typography>

          {errorMsg && (
            <Typography color="error" sx={{ mb: 2 }}>
              {errorMsg}
            </Typography>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              value={form.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />

            <TextField
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={form.password}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              sx={{
                py: 1.5,
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #1976d2, #42a5f5)',
                '&:hover': {
                  background: 'linear-gradient(to right, #1565c0, #2196f3)',
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
          </Box>
        </Paper>
      </Fade>
    </Grid>
  );
};

export default AdminLogin;
