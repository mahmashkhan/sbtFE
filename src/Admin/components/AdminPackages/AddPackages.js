import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Stack,
    Chip,
    CircularProgress,
    FormControl,
    Select,
    MenuItem,
    InputLabel
} from '@mui/material';
import AdminLayout from '../../pages/AdminLayout';

import { useNavigate } from 'react-router-dom';
import { addPackages } from '../../../api/PackagesApi';

const AddPackages = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        category: '',
        slug: '',
        type: '',
        price: '',
        features: [],
    });
    const [featureInput, setFeatureInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleAddFeature = () => {
        if (featureInput.trim()) {
            setForm({ ...form, features: [...form.features, featureInput.trim()] });
            setFeatureInput('');
        }
    };

    const handleDeleteFeature = (index) => {
        const updated = [...form.features];
        updated.splice(index, 1);
        setForm({ ...form, features: updated });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !form.category ||
            !form.slug ||
            !form.type ||
            !form.price ||
            form.features.length === 0
        ) {
            setError('All fields including features are required.');
            return;
        }

        setLoading(true);
        try {
            await addPackages(form);
            navigate('/admin/get/packages');
        } catch (err) {
            console.error('Error adding package:', err);
            setError('Failed to add package. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
          

            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    maxWidth: 600,
                    mx: 'auto',
                    mt: 5,
                    backgroundColor: '#000',
                    color: '#fff',
                }}
            >
                <Typography variant="h5" gutterBottom sx={{ color: '#fff' }}>
                    Add New Package
                </Typography>

                {error && (
                    <Typography sx={{ mb: 2, color: '#f44336' }}>
                        {error}
                    </Typography>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <FormControl fullWidth>
                            <InputLabel sx={{ color: '#fff' }}>Category</InputLabel>
                            <Select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                required
                                sx={{
                                    color: '#fff',
                                    '.MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#42a5f5',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#90caf9',
                                    },
                                }}
                            >
                                <MenuItem value="Restaurant and Cafes">Restaurant and Cafes</MenuItem>
                                <MenuItem value="Fashion and Clothing Brands">Fashion and Clothing Brands</MenuItem>
                                <MenuItem value="Event Coverage">Event Coverage</MenuItem>
                                <MenuItem value="Ecommerce/Products Brands">Ecommerce/Products Brands</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel sx={{ color: '#fff' }}>Slug</InputLabel>
                            <Select
                                name="slug"
                                value={form.slug}
                                onChange={handleChange}
                                required
                                sx={{
                                    color: '#fff',
                                    '.MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#42a5f5',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#90caf9',
                                    },
                                }}
                            >
                                <MenuItem value="food">food</MenuItem>
                                <MenuItem value="fashion">fashion</MenuItem>
                                <MenuItem value="event">event</MenuItem>
                                <MenuItem value="products">products</MenuItem>
                            </Select>
                        </FormControl>


                        <TextField
                            label="Type"
                            name="type"
                            value={form.type}
                            onChange={handleChange}
                            required
                            fullWidth
                            InputLabelProps={{ style: { color: '#fff' } }}
                            InputProps={{ style: { color: '#fff' } }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#fff' },
                                    '&:hover fieldset': { borderColor: '#90caf9' },
                                    '&.Mui-focused fieldset': { borderColor: '#42a5f5' },
                                },
                            }}
                        />
                        <TextField
                            label="Price"
                            name="price"
                            type="number"
                            value={form.price}
                            onChange={handleChange}
                            required
                            fullWidth
                            InputLabelProps={{ style: { color: '#fff' } }}
                            InputProps={{ style: { color: '#fff' } }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#fff' },
                                    '&:hover fieldset': { borderColor: '#90caf9' },
                                    '&.Mui-focused fieldset': { borderColor: '#42a5f5' },
                                },
                            }}
                        />

                        {/* Feature input */}
                        <Stack direction="row" spacing={2}>
                            <TextField
                                label="Add Feature"
                                value={featureInput}
                                onChange={(e) => setFeatureInput(e.target.value)}
                                fullWidth
                                InputLabelProps={{ style: { color: '#fff' } }}
                                InputProps={{ style: { color: '#fff' } }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: '#fff' },
                                        '&:hover fieldset': { borderColor: '#90caf9' },
                                        '&.Mui-focused fieldset': { borderColor: '#42a5f5' },
                                    },
                                }}
                            />
                            <Button variant="contained" color="primary" onClick={handleAddFeature}>
                                Add
                            </Button>
                        </Stack>

                        {/* Display added features */}
                        <Stack direction="row" flexWrap="wrap" spacing={1}>
                            {form.features.map((feature, idx) => (
                                <Chip
                                    key={idx}
                                    label={feature}
                                    onDelete={() => handleDeleteFeature(idx)}
                                    sx={{
                                        backgroundColor: '#1976d2',
                                        color: '#fff',
                                        '& .MuiChip-deleteIcon': { color: '#fff' },
                                    }}
                                />
                            ))}
                        </Stack>

                        <Button
                            type="submit"
                            variant="outlined"
                            color="success"
                            disabled={loading}
                            startIcon={loading ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : null}
                            sx={{ textTransform: 'none' }}
                        >
                            {loading ? 'Adding...' : 'Add Package'}
                        </Button>
                    </Stack>
                </Box>
            </Paper>
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    my: 4,
                    
                    borderLeft: '6px solid #1976d2',
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Note:
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                    These are the mandatory relations of category and slug that must be followed when adding a package:
                    <br />
                    <strong>Restaurant and Cafes</strong> — <code>food</code>
                    <br />
                    <strong>Fashion and Clothing Brands</strong> — <code>fashion</code>
                    <br />
                    <strong>Event Coverage</strong> — <code>event</code>
                    <br />
                    <strong>Ecommerce/Products Brands</strong> — <code>products</code>
                </Typography>
            </Paper>

        </AdminLayout>
    );
};

export default AddPackages;
