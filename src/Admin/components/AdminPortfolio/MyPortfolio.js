import React, { useEffect } from 'react'
import { fetchPortfolio, PortfolioDelete } from '../../../api/PortfolioApi';
import { Divider, Typography, Grid, Box, Container, Button } from '@mui/material';
import AdminLayout from '../../pages/AdminLayout';
import { useNavigate } from 'react-router-dom';

import ModalLayout from '../Modal';
import { Helmet } from "react-helmet"

export default function MyPortfolio() {
    const [open, setOpen] = React.useState(false)
    const [selectedId, setSelectedId] = React.useState('')
    const navigate = useNavigate();
    const [portfolio, setPortfolio] = React.useState([]);
    useEffect(() => {
        const getPortfolio = async () => {
            try {
                const response = await fetchPortfolio()
                setPortfolio(response);

            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };
        getPortfolio();
    },[])
    const portfolioDelete = async () => {
        await PortfolioDelete(selectedId)

    }
    const handleOpenModal = (id) => {
        setSelectedId(id);
        setOpen(true)
    }


    return (<>
    <Helmet><title>Dashboard</title></Helmet>
        <AdminLayout>
            {/* <AdminHeader /> */}
            <Container maxWidth="lg" >
                <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', m: 4, mb: 6 }}>
                    <Typography sx={{fontWeight:'bold',}} variant="h4">
                        Portfolio
                    </Typography>
                    
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <Button onClick={() => { navigate('/admin/add/portfolio') }} variant="outlined">Add Portfolio</Button>
                </Box>

                {portfolio.length === 0 ? (
                    <Typography variant="body1" sx={{ textAlign: 'center' }}>
                        No Portfolio Found
                    </Typography>
                ) : (
                    portfolio.map((item) => (
                        <Box key={item._id} sx={{ mb: 8 }}>
                            <Grid container spacing={0} sx={{ alignItems: 'flex-start' }}> {/* Reduced spacing and centered items */}
                                {item.video && item.video.length > 0 ? (
                                    <Grid size={{ xs: 12, md: 6 }} sx={{ pr: { md: 1 } }}> {/* Reduced padding-right on desktop */}


                                        {item.video.map((url, index) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                    position: 'relative',
                                                    width: '100%',
                                                    maxWidth: { xs: '100%', sm: '180px', md: '300px' }, // Kept smaller size
                                                    aspectRatio: '9 / 16', // Vertical reel aspect ratio
                                                    overflow: 'hidden',
                                                    mx: 'auto', // Center the reel
                                                    borderRadius: 2, // Slight rounding for reel aesthetic
                                                }}
                                            >
                                                <iframe
                                                    src={url}
                                                    title={`video-${index}`}
                                                    frameBorder="0"
                                                    allow="autoplay; fullscreen; picture-in-picture"
                                                    allowFullScreen
                                                    style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        width: '100%',
                                                        height: '100%',
                                                        border: 'none',
                                                    }}
                                                />
                                            </Box>
                                        ))}

                                    </Grid>
                                ) : (
                                    <Typography variant="body2" color="text.secondary">
                                        No videos available.
                                    </Typography>
                                )}
                                <Grid size={{ xs: 12, md: 6 }} sx={{ pl: { md: 1 } }}> {/* Reduced padding-left on desktop */}
                                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, mt: 2 }}>
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                                        {item.description}
                                    </Typography>
                                    <Grid justifyContent='flex-end' display='flex'>
                                        <Button
                                            disableElevation
                                            variant="outlined"
                                            sx={{ mr: 1 }} color='primary' onClick={() => navigate(`/admin/update/portfolio/${item._id}`)}>Edit</Button>
                                        <Button
                                            onClick={() => handleOpenModal(item._id)}
                                            disableElevation
                                            variant="outlined"
                                            color='error'

                                        >
                                            Delete
                                        </Button></Grid>
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 4, bgcolor: 'grey.800' }} />
                        </Box>


                    ))
                )}
            </Container>
        </AdminLayout>
        <ModalLayout open={open} setOpen={setOpen} onDelete={portfolioDelete} />
    </>
    )
}
