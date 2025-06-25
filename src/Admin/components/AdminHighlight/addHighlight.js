// src/pages/AddHighlightPage.jsx
import React, { useState } from 'react';
import {  Button, TextField, Typography, Container, Alert, Paper } from '@mui/material';
import { addHighlight } from '../../../api/HighlightApi';

import AdminLayout from '../../pages/AdminLayout';

const AddHighlightPage = () => {
    const [highlight, setHighlight] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!highlight) {
            setErrorMsg('Please enter a highlight video URL');
            return;
        }

        try {
            await addHighlight({ highlight: highlight });
            setSuccessMsg('Highlight video saved successfully!');
            setErrorMsg('');
            setHighlight('');
        } catch (error) {
            setErrorMsg(error.response?.data?.message || 'Failed to save highlight');
            setSuccessMsg('');
        }
    };

    return (
        <AdminLayout>
            
            <Container maxWidth="sm">

                <Paper
                 elevation={3}
                sx={{
                    p: 4,
                    maxWidth: 600,
                    mx: 'auto',
                    mt: 5,
                    backgroundColor: '#000',
                    color: '#fff',
                }}>
                    <Typography variant="h5" mb={2}>
                        Add Highlight Video
                    </Typography>

                    {successMsg && <Alert severity="success">{successMsg}</Alert>}
                    {errorMsg && <Alert severity="error" sx={{ mt: 2 }}>{errorMsg}</Alert>}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Highlight Video URL"
                            variant="outlined"
                            fullWidth
                            value={highlight}
                            onChange={(e) => setHighlight(e.target.value)}
                            sx={{ mt: 2 }}
                        />

                        <Button
                            type="submit"
                            color="success"
                            variant="outlined"
                            sx={{ mt: 3 }}
                            fullWidth
                        >
                            Submit
                        </Button>
                    </form>
                </Paper>
            </Container>
        </AdminLayout>
    );
};

export default AddHighlightPage;
