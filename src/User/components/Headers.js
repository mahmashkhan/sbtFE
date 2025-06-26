"use client";
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Collapse,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import InventoryIcon from '@mui/icons-material/Inventory';
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import Logo from "../../images/Logo2.png";

function NavItem({ name, icon: Icon, href }) {
  return (
    <ListItem
      component="a"
      href={href}
      button
      sx={{
        color: "white",
        px: 2,
        "&:hover": {
          backgroundColor: "rgba(255,255,255,0.08)",
        },
      }}
    >
      <ListItemIcon sx={{ minWidth: 35, color: "white" }}>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const navigate = useNavigate();

  const NAV_MENU = [
    { name: "Our Work", icon: WorkOutlineIcon, href: "/portfolio" },
    { name: "Packages", icon: InventoryIcon, href: "/packages" },
    { name: "Services", icon: DesignServicesIcon, href: "/services" },
    { name: "About", icon: InfoOutlinedIcon, href: "/about" },
    { name: "Contact", icon: ContactMailOutlinedIcon, href: "/contact" },
    { name: "Our Team", icon: GroupOutlinedIcon, href: "/team" },
  ];

  useEffect(() => {
    if (isLargeScreen) setOpen(false);
  }, [isLargeScreen]);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={3}
        sx={{
          bgcolor: alpha("#000", 0.85),
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: { xs: 2, sm: 4, lg: 9 },
            minHeight: { xs: 56, sm: 64 }, // shorter height on mobile
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <Box
              component="img"
              src={Logo}
              alt="SBT Logo"
              sx={{
                width: 90,
                height: 70,
                objectFit: "contain",
              }}
            />
          </Box>

          {/* Desktop Menu */}
          <Box
            component="nav"
            sx={{
              display: { xs: "none", lg: "flex" },
              gap: 4,
              alignItems: "center",
            }}
          >
            {NAV_MENU.map(({ name, icon, href }) => (
              <Box
                key={name}
                component="a"
                href={href}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "rgb(255, 255, 255)",
                  textDecoration: "none",
                  gap: 1,
                  fontWeight: 500,
                  fontSize: "1rem",
                  transition: "color 0.2s ease",
                  "&:hover": {
                    color: "rgb(216, 26, 26)",
                  },
                }}
              >
                {React.createElement(icon, {
                  style: { width: 20, height: 20 },
                })}
                {name}
              </Box>
            ))}
          </Box>

          {/* Mobile menu toggle */}
          <IconButton
            color="inherit"
            onClick={() => setOpen(!open)}
            sx={{ display: { lg: "none" } }}
            aria-label="toggle menu"
          >
            {open ? (
              <CloseIcon style={{ width: 24, height: 24 }} />
            ) : (
              <MenuIcon style={{ width: 24, height: 24 }} />
            )}
          </IconButton>
        </Toolbar>

        {/* Mobile Menu */}
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List
            component="nav"
            sx={{
              display: { lg: "none" },
              px: 2,
              bgcolor: "rgba(0, 0, 0, 0.95)",
              color: "white",
            }}
          >
            {NAV_MENU.map(({ name, icon, href }) => (
              <NavItem key={name} name={name} icon={icon} href={href} />
            ))}
          </List>
        </Collapse>
      </AppBar>
    </>
  );
}
