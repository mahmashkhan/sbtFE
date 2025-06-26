import React, { useEffect, useRef, useState } from 'react';
import { getTeam } from '../../../api/TeamApi';
import {
    IconButton,
    Typography,
    Box,
} from '@mui/material';

import Headers from '../../components/Headers';
import Footer from '../../components/Footer';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from "react-helmet"

export default function GetTeam() {
    const [response, setResponse] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        const teamData = async () => {
            const data = await getTeam();
            setResponse(data);
        };
        teamData();
    }, []);

    const scroll = (direction) => {
        const container = scrollRef.current;
        const cardWidth = container.offsetWidth / 3;
        container.scrollBy({
            left: direction === 'left' ? -cardWidth : cardWidth,
            behavior: 'smooth',
        });
    };

    return (
        <>
            <Helmet><title>Team</title></Helmet>
            <Headers />

            <Box textAlign="center">
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 'bold',
                        letterSpacing: 2,
                        textTransform: 'uppercase',
                        color: '#ffffff',
                        position: 'relative',
                        display: 'inline-block',
                        m: 3,
                        pb: 1,
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '60%',
                            height: '4px',
                            backgroundColor: 'rgb(139, 18, 18)',
                            borderRadius: 2,
                        },
                    }}
                >
                    MEET THE TEAM
                </Typography>
            </Box>

            <Box sx={{ position: 'relative', px: 4 }}>
                {/* Scroll Arrows - Hidden on mobile */}
                <IconButton
                    onClick={() => scroll('left')}
                    sx={{
                        position: 'absolute',
                        top: '40%',
                        left: 0,
                        zIndex: 1,
                        display: { xs: 'none', md: 'flex' },
                        boxShadow: 2,
                        '&:hover': { backgroundColor: 'rgb(180, 29, 29)' },
                    }}
                >
                    <ArrowBackIosNewIcon />
                </IconButton>

                <IconButton
                    onClick={() => scroll('right')}
                    sx={{
                        position: 'absolute',
                        top: '40%',
                        right: 0,
                        zIndex: 1,
                        display: { xs: 'none', md: 'flex' },
                        boxShadow: 2,
                        '&:hover': { backgroundColor: 'rgb(180, 29, 29)' },
                    }}
                >
                    <ArrowForwardIosIcon />
                </IconButton>

                {/* Scrollable Cards */}
                <Box
                    ref={scrollRef}
                    sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        scrollBehavior: 'smooth',
                        whiteSpace: 'nowrap',
                        gap: 2,
                        py: 4,
                        px: 2,
                        '&::-webkit-scrollbar': { display: 'none' },
                        WebkitOverflowScrolling: 'touch',
                    }}
                >
                    {response.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                flex: '0 0 auto',
                                width: {
                                    xs: '80%',
                                    sm: '60%',
                                    md: '33.33%',
                                },
                                px: 1,
                                boxSizing: 'border-box',
                                display: 'inline-block',
                            }}
                        >
                            <Box
                                data-aos="fade-up"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    // mb: 2,
                                    objectFit: 'cover',

                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    boxShadow: 3,
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: { xs: 200, sm: 220, md: 290 },
                                        overflow: 'hidden',
                                        borderRadius: '12px',
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={item.image}
                                        alt={item.name}
                                        loading="lazy"
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: {
                                                xs: 'cover',
                                                md: 'contain',
                                            },
                                            backgroundColor: '#000',
                                            display: 'block',


                                        }}
                                    />

                                </Box>




                                {/* Member Info */}
                                <Box sx={{ p: 2 }}>
                                    <Typography variant="h6" gutterBottom>
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        {item.description}
                                    </Typography>

                                    {item.link && (
                                        <IconButton
                                            component="a"
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{
                                                color: '#0a66c2',
                                                '&:hover': { color: '#004182' },
                                            }}
                                        >
                                            <LinkedInIcon fontSize="medium" />
                                        </IconButton>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Footer />
        </>
    );
}
