import React, { useState } from 'react';
import {
    Box, TextField, Button, Typography, Paper, Stack
} from '@mui/material';
import AdminLayout from '../../pages/AdminLayout';
import Alert from '../../../Alert/Alert'
// import { editTeam } from '../../../api/TeamApi';
import { useNavigate } from 'react-router-dom';


const EditTeam = () => {
    // const { id } = useParams();
    const [form, setForm] = useState({
        name: '',
        link: '',
        description: '',
    });
    const [image, setImage] = useState(null);
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('success');
    const [message, setMessage] = useState("");
    const navigate = useNavigate()
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
        if (image) {
            formData.append('image', image);
        }

        try {
            // const response = await editTeam(formData, id);
            
            setOpen(true)
            setType('info')
            setMessage('Member Updated')
            setTimeout(() => navigate('/admin/get/team'), 1500)
        } catch (error) {
            console.error('Update error:', error);
            alert('Failed to update team member');
        }
    };

    return (
        <AdminLayout>

            <Paper elevation={4} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
                <Typography variant="h5" gutterBottom>
                    Edit Team Entry
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
                            required
                        />
                        <Button variant="contained" component="label">
                            Upload Image
                            <input type="file" name="image" hidden onChange={handleFileChange} />
                        </Button>
                        {image && (
                            <Typography variant="body2">Selected: {image.name}</Typography>
                        )}
                        <Button type="submit" variant="contained">Update Team Member</Button>
                    </Stack>
                </Box>
            </Paper>
            <Alert open={open} setOpen={setOpen} message={message} type={type} />
        </AdminLayout>
    );
};

export default EditTeam;
