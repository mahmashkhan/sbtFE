import React, { useState } from 'react';
import {
    Box, TextField, Button, Typography, Paper, Stack
} from '@mui/material';
import AdminLayout from '../../pages/AdminLayout';
import CustomAlert from '../../../Alert/Alert'
import {addTeam} from '../../../api/TeamApi'
import { useNavigate } from 'react-router-dom';

const AddTeam = () => {
    const [form, setForm] = useState({
        name: '',
        link: '',
        description: '',
    });
    const [image, setImage] = useState(null);
    const [open, setOpen] = useState(false);
    const [message, setMessage] =useState('');
    const [type, setType] = React.useState('success')
    const navigate = useNavigate('')
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

   const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('link', form.link);
    formData.append('description', form.description);
    formData.append('image', image);

    try {
        const response = await addTeam(formData);
        
        setType('success')
        setOpen(true)
        setMessage('Team member added successfully!')
        setForm({ name: '', link: '', description: '' });
        setImage(null);
         setTimeout(() => navigate('/admin/get/team'), 1500);
        
    } catch (error) {
        console.error('Upload error:', error);
        alert('Failed to add team member');
    }
};


    return (
        <AdminLayout>
            <Paper elevation={4} sx={{ p: 4, maxWidth: 600, mx: 'auto',bgcolor:'#000' }}>
                <Typography variant="h5" gutterBottom>
                    Add Team Entry
                </Typography>
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
                            label="Link"
                            name="link"
                            value={form.link}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Role"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            // multiline
                            // rows={3}
                            required
                        />
                        <Button variant="outlined" component="label" color="primary">
                            Upload Image
                            <input type="file" name="image" hidden onChange={handleFileChange} />
                        </Button>
                        {image && (
                            <Typography variant="body2">Selected: {image.name}</Typography>
                        )}
                        <Button color='success' type="submit" variant="outlined">Add Team Member</Button>
                    </Stack>
                </Box>
            </Paper>
            <CustomAlert open={open} setOpen={setOpen} type={type} message={message} />
        </AdminLayout>
    );
};

export default AddTeam;
