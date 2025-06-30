import React, { useState } from 'react';
import {
  Box, TextField, Button, Typography, Paper, Stack
} from '@mui/material';
import AdminLayout from '../../pages/AdminLayout';
import { addAbout } from '../../../api/AboutApi';
import { useNavigate } from 'react-router-dom';
import CustomAlert from '../../../Alert/Alert';

const AddAbout = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ para1: '', para2: '', para3: '' });
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.para1 || !form.para2 || !form.para3) return;

    try {
      await addAbout({
        para1: form.para1,
        para2: form.para2,
        para3: form.para3
      });

      setForm({ para1: '', para2: '', para3: '' });
      setOpen(true);
      setType('success');
      setMessage('About Data Added Successfully');

      setTimeout(() => {
        navigate('/admin/get/about');
      }, 2000);

    } catch (error) {
      console.error('Error adding about entry:', error);
      alert('Failed to add about entry.');
    }
  };

  return (
    <>
      <AdminLayout>
        <Paper elevation={4} sx={{ p: 4, maxWidth: 600, mx: 'auto', bgcolor: '#000' }}>
          <Typography variant="h5" gutterBottom color="white">
            Add About Entry
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Paragraph 1"
                name="para1"
                value={form.para1}
                onChange={handleChange}
                multiline
                rows={3}
                required
              />
              <TextField
                label="Paragraph 2"
                name="para2"
                value={form.para2}
                onChange={handleChange}
                multiline
                rows={3}
                required
              />
              <TextField
                label="Paragraph 3"
                name="para3"
                value={form.para3}
                onChange={handleChange}
                multiline
                rows={3}
                required
              />
              <Button type="submit" variant="outlined" color="success">
                Add About
              </Button>
            </Stack>
          </Box>
        </Paper>
      </AdminLayout>
      <CustomAlert open={open} setOpen={setOpen} type={type} message={message} />
    </>
  );
};

export default AddAbout;
