import React, { useState } from 'react';
import {
    Box, TextField, Button, Typography, Paper, Stack
} from '@mui/material';
import AdminLayout from '../../pages/AdminLayout';
import { editAbout } from '../../../api/AboutApi'
import { useNavigate, useParams } from 'react-router-dom';
import CustomAlert from '../../../Alert/Alert';

const EditAbout = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [form, setForm] = useState({ description: '' });
    const [open,setOpen] = useState(false)
    const [message,setMessage] = useState('')
    const [type,setType] = useState('')

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.description) return;
        try {
            await editAbout({ about: form.description }, id);
            setForm({ description: '' });

            setOpen(true)
            setType('info')
           setMessage('About Data Edited Successfully')
            setTimeout(() => {navigate('/admin/get/about')  }, 2000)

            
        } catch (error) {
            console.error('Error adding about entry:', error);
            alert('Failed to add about entry.');
        }
    };

    return (
        <AdminLayout>
            <Paper elevation={4} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
                <Typography variant="h5" gutterBottom>
                    Add About Entry
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            label="Description"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            multiline
                            rows={3}
                            required
                        />
                        <Button type="submit" variant="contained">Add About</Button>
                    </Stack>
                </Box>
            </Paper>
            <CustomAlert open = {open} setOpen={setOpen} type={type} message={message}/>
        </AdminLayout>
        
    );
};

export default EditAbout;