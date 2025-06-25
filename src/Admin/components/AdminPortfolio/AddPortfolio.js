import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import AdminLayout from '../../pages/AdminLayout';
import { addPortfolio } from '../../../api/PortfolioApi';
import { useNavigate } from 'react-router-dom';


const AdminPortfolioPanel = () => {
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState([]);
  const [form, setForm] = useState({ name: '', url: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(''); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.name || !form.video || !form.description) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);
    try {
      const newPortfolio = await addPortfolio({
        video: form.video,
        name: form.name,
        description: form.description,
      });
      setPortfolio([...portfolio, newPortfolio]); 
      setForm({ name: '', url: '', description: '' }); 
      alert('Portfolio entry added successfully!');
      navigate('/admin/dashboard'); 
    } catch (error) {
      console.error('Error adding portfolio entry:', error);
      setError('Failed to add portfolio entry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>

      <Paper elevation={4} sx={{ p: 4, maxWidth: 600, mx: 'auto',bgcolor:'#000000' }}>
        <Typography variant="h5" gutterBottom>
          Add Portfolio Entry
        </Typography>
        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Video (URL)"
              name="video"
              value={form.video}
              onChange={handleChange}
              required
            />
            <TextField
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              multiline
              rows={3}
              required
            />
            <Button
              type="submit"
              variant="outlined"
              color="success"
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} />}
            >
              {loading ? 'Adding...' : 'Add Portfolio'}
            </Button>
          </Stack>
        </Box>
      </Paper>

      {portfolio.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>Portfolio List</Typography>
          <List>
            {portfolio.map((item, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={item.name}
                  secondary={
                    <>
                      <Typography component="span">{item.description}</Typography>
                      <br />
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        {item.video}
                      </a>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </AdminLayout>
  );
};

export default AdminPortfolioPanel;