
import {
    Box,
    Container,
    Grid,
    Typography,

} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import BrushIcon from "@mui/icons-material/Brush";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import Headers from "../../components/Headers";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet"


const serviceData = [
    {
        title: "Video Production",
        icon: <PlayCircleOutlineIcon fontSize="large" />,
        details: [
            "Commercial & Ad Films",
            "Product Videos",
            "Restaurant Reels",
            "Event Coverage",
            "Testimonial Videos",
        ],
    },
    {
        title: "Photography",
        icon: <MovieCreationIcon fontSize="large" />,
        details: [
            "Product Photography",
            "Fashion Shoots",
            "Food Photography",
            "Event Photography",
            "Editorial/Creative",
        ],
    },
    {
        title: "SMM",
        icon: <LightbulbIcon fontSize="large" />,
        details: [
            "Social Media Management",
            "Content Calendars",
            "Reels & Posts",
            "Community Engagement",
            "Hashtag Optimization",
            "Paid Ads Integration",
        ],
    },
    {
        title: "Brand Identity & Design",
        icon: <BrushIcon fontSize="large" />,
        details: [
            "Logo Design",
            "Brand Kit",
            "Style Guide",
            "Print Design",
            "Digital Menus",
        ],
    },
    {
        title: "Marketing & Strategy",
        icon: <TrendingUpIcon fontSize="large" />,
        details: [
            "Social Ads Strategy",
            "Influencer Campaigns",
            "Email Marketing",
            "Website Creation",
            "SEO",
        ],
    },
    {
        title: "E-Commerce Video",
        icon: <ShoppingCartIcon fontSize="large" />,
        details: ["Amazon Videos", "Shopify Store Videos", "UGC-style Content"],
    },
    {
        title: "Consultation",
        icon: <TipsAndUpdatesIcon fontSize="large" />,
        details: ["Content Consulting", "Creative Planning", "On-set Direction"],
    },
];

const Services = () => {


    return (
        <>
            <Helmet><title>Services</title></Helmet>
            <Headers />
            <Box sx={{ mb:2, minHeight: "100vh" }}>
                <Container>
                    <Box textAlign="center" >
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 'bold',
                                letterSpacing: 2,
                                textTransform: 'uppercase',
                                color: '#ffffff', // or a theme-based primary color
                                position: 'relative',
                                display: 'inline-block',
                                m: 4,
                                pb: 1,
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: 0,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '60%',
                                    height: '4px',
                                    backgroundColor: 'rgb(139, 18, 18)', // Blue underline (or brand color)
                                    borderRadius: 2,
                                },
                            }}
                        >
                            Our Services
                        </Typography>

                    </Box>
                    <Typography
                        align="center"

                        sx={{ mb: 3 ,fontWeight:'bold'}}
                    >
                        (What We Offer!)
                    </Typography>

                    <Grid container spacing={4} justifyContent="center">
                        {serviceData.map((service, index) => (
                            <Grid
                                key={index}
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 300,
                                        height: 280,
                                        backgroundColor: "#121212", // Darker black
                                        borderRadius: 3,
                                        p: 3,
                                        border: "1px solid rgba(255, 0, 0, 0.3)", // Subtle red border
                                        boxShadow: "0 8px 20px rgba(255,0,0,0.1)", // Red glow
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "flex-start",
                                        alignItems: "flex-start",
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            transform: "translateY(-5px)",
                                            boxShadow: "0 12px 30px rgba(255,0,0,0.2)", // Deeper red glow
                                            borderColor: "rgba(255, 0, 0, 0.6)",
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            color: "rgb(139, 18, 18)", // Deep red
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                            mb: 2,
                                            "& svg": {
                                                fontSize: "2rem",
                                            },
                                        }}
                                    >
                                        {service.icon}
                                        <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600 }}>
                                            {service.title}
                                        </Typography>
                                    </Box>

                                    <Box
                                        component="ul"
                                        sx={{
                                            pl: 2,
                                            color: "#ccc",
                                            fontSize: "0.9rem",
                                            lineHeight: 1.7,
                                            listStyle: "disc",
                                        }}
                                    >
                                        {service.details.slice(0, 5).map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))}
                                    </Box>
                                </Box>

                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
            <Footer />
        </>
    );
};

export default Services;
