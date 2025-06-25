import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Stack,
    CircularProgress,
} from '@mui/material';
import AdminLayout from '../../pages/AdminLayout';
import { updatePortfolio } from '../../../api/PortfolioApi';
import { useNavigate, useParams } from 'react-router-dom';


const EditPortfolio = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', video: '', description: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [initialLoading, setInitialLoading] = useState(true);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError(''); // Clear error on input change
    };

    useEffect(() => {
        const fetchPortfolioById = async () => {
            try {
                const res = await fetch(`http://localhost:4000/api/portfolio/${id}`);
                const data = await res.json();
                setForm({
                    name: data.name || '',
                    video: data.video || '',
                    description: data.description || '',
                });
            } catch (err) {
                console.error('Error fetching portfolio:', err);
                setError('Failed to load portfolio details.');
            } finally {
                setInitialLoading(false);
            }
        };

        fetchPortfolioById();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.video || !form.description) {
            setError('All fields are required.');
            return;
        }

        setLoading(true);
        try {
            await updatePortfolio(
                {
                    name: form.name,
                    video: form.video,
                    description: form.description,
                },
                id
            );

            alert('Portfolio entry updated successfully!');
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Error updating portfolio entry:', error);
            setError('Failed to update portfolio entry.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            
            <Paper elevation={4} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
                <Typography variant="h5" gutterBottom>
                    Edit Portfolio Entry
                </Typography>

                {initialLoading ? (
                    <Box display="flex" justifyContent="center" mt={4}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
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
                                    variant="contained"
                                    disabled={loading}
                                    startIcon={loading && <CircularProgress size={20} />}
                                >
                                    {loading ? 'Updating...' : 'Update'}
                                </Button>
                            </Stack>
                        </Box>
                    </>
                )}
            </Paper>
        </AdminLayout>
    );
};

export default EditPortfolio;
