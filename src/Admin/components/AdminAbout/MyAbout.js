import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
 
  Container,
  CircularProgress,
  Button,
  Stack,
  Paper,
} from '@mui/material';
import { AboutDelete, getAbout } from '../../../api/AboutApi';
import AdminLayout from '../../pages/AdminLayout';
import { useNavigate } from 'react-router-dom';

import ModalLayout from '../Modal';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const About = () => {
  const [about, setAbout] = useState('');
  const [open, setOpen] = useState(false);
  const [Id, setId] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await getAbout();
        setAbout(response.data.about);
        setId(response.data._id);
      } catch (error) {
        console.error('Error fetching about content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  const deleteAbout = async () => {
    try {
      await AboutDelete(Id);
      setAbout('');
      setId('');
      setOpen(false);
    } catch (error) {
      console.error("Failed to delete about section:", error);
    }
  };

  const handleOpenModal = (id) => {
    setId(id);
    setOpen(true);
  };

  return (
    <>
      <AdminLayout>
        
        <Box sx={{ minHeight: '100vh' }}>
          <Container maxWidth="md">
            <Box textAlign="center" mb={4 } mt={4}>
              <Typography variant="h4" fontWeight="bold" >
                About Us
              </Typography>
              
            </Box>

            {loading ? (
              <Box display="flex" justifyContent="center" mt={6}>
                <CircularProgress color="primary" />
              </Box>
            ) : (
              <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                {about ? (
                  <>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.primary',
                        fontSize: '1.1rem',
                        lineHeight: 1.8,
                        textAlign: 'justify',
                      }}
                    >
                      {about}
                    </Typography>

                    <Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
                      <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => navigate(`/admin/edit/about/${Id}`)}
                        color="primary"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleOpenModal(Id)}
                        color="error"
                      >
                        Delete
                      </Button>
                    </Stack>
                  </>
                ) : (
                  <Box textAlign="center">
                    <Typography variant="body1" color="text.secondary" mb={3}>
                      No About Us content available. Please add some details.
                    </Typography>
                    <Button
                      onClick={() => navigate('/admin/add/about')}
                      variant="contained"
                      startIcon={<AddIcon />}
                      sx={{ borderRadius: 2 }}
                    >
                      Add About
                    </Button>
                  </Box>
                )}
              </Paper>
            )}
          </Container>
        </Box>
      </AdminLayout>
      <ModalLayout open={open} setOpen={setOpen} onDelete={deleteAbout} />
    </>
  );
};

export default About;
