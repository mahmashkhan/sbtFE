import React, { useEffect, useState } from 'react';
import {
    AppBar,
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    Typography,
    Divider,
    ListItemButton,
    useMediaQuery,
    Modal,
    Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo2 from "../../images/Logo2.png";
import WarningIcon from '@mui/icons-material/Warning';


const drawerWidth = 240;
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 400 },
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 3,
    p: { xs: 3, sm: 4 },
    textAlign: 'center',
};
const navItems = [
    { label: 'My Portfolio', path: '/admin/dashboard' },
    { label: 'About', path: '/admin/get/about' },
    { label: 'Highlights Video', path: '/admin/get/highlight' },
    { label: 'Packages', path: '/admin/get/packages' },
    { label: 'Team', path: '/admin/get/team' },
    { label: 'Logout', path: '/logout' }, // Special case to trigger modal
];

const AdminLayout = ({ children }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    useEffect(() => {
        if (!isMobile) {
            setMobileOpen(false);
        }
    }, [isMobile]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setLogoutModalOpen(false);
        navigate('/admin/login');
    };

    const handleNavClick = (item) => {
        if (item.label === 'Logout') {
            setLogoutModalOpen(true);
        } else {
            navigate(item.path);
            if (isMobile) setMobileOpen(false);
        }
    };

    const drawerContent = (
        <Box sx={{ backgroundColor: '#1e1e2f', height: '100%', color: '#fff' }}>
            <Toolbar sx={{ justifyContent: 'center' }}>
                <Box
                    component="img"
                    src={Logo2}
                    alt="SBT Production Logo"
                    sx={{
                        height: 90, // adjust as needed
                        objectFit: 'contain',
                    }}
                />
            </Toolbar>
            <Divider sx={{ borderColor: '#424242' }} />
            <List>
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <ListItem key={item.label} disablePadding>
                            <ListItemButton
                                onClick={() => handleNavClick(item)}
                                sx={{
                                    px: 3,
                                    color: '#ffffff',
                                    backgroundColor: isActive ? '#3949ab' : 'transparent',
                                    '&:hover': {
                                        backgroundColor: '#2c2c3e',
                                    },
                                }}
                            >
                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{
                                        fontWeight: isActive ? 'bold' : 'medium',
                                        color: isActive ? '#ffffff' : '#cfd8dc',
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );

    return (
        <>
            <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#121212', overflowX: 'hidden' }}>
                {/* AppBar for Mobile */}
                {isMobile && (
                    <AppBar
                        position="fixed"
                        sx={{
                            backgroundColor: '#1e1e2f',
                            zIndex: theme.zIndex.drawer + 1,
                        }}
                    >
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                variant="h6"
                                noWrap
                                sx={{
                                    color: '#90caf9',
                                    fontWeight: 'bold',
                                    fontSize: { xs: '1rem', sm: '1.25rem' }
                                }}
                            >
                                SBT Production
                            </Typography>
                        </Toolbar>
                    </AppBar>
                )}

                {/* Drawer for both mobile and desktop */}
                <Drawer
                    variant={isMobile ? 'temporary' : 'permanent'}
                    open={isMobile ? mobileOpen : true}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            backgroundColor: '#1e1e2f',
                            color: '#fff',
                        },
                    }}
                >
                    {drawerContent}
                </Drawer>

                {/* Main Content */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: { xs: 2, sm: 4 },
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        pt: isMobile ? '64px' : 0,
                        mt: isMobile ? 4 : 0,
                        backgroundColor: '#121212',
                        color: '#ffffff',
                    }}
                >
                    {children}
                </Box>
            </Box>

            {/* Logout Confirmation Modal */}
            <Modal
                open={logoutModalOpen}
                onClose={() => setLogoutModalOpen(false)}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                        <WarningIcon color="error" sx={{ fontSize: '2rem', mr: 1 }} />
                        <Typography id="modal-title" variant="h6" fontWeight="bold" color="text.primary">
                            Confirm Logout
                        </Typography>
                    </Box>

                    <Typography
                        id="modal-description"
                        sx={{ mt: 1, color: 'text.secondary', fontSize: '0.95rem' }}
                    >
                        Are you sure you want to logout?
                    </Typography>

                    <Box
                        sx={{
                            mt: 4,
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: { xs: 'column', sm: 'row' },
                            gap: 2,
                        }}
                    >
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => setLogoutModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </Box>
                </Box>
            </Modal>

        </>
    );
};

export default AdminLayout;
