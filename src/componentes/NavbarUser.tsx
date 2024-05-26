import { useAuth } from "../context/authContext";
import { AppBar, Toolbar, Button, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import easyCounterLogo from "../../public/images/easy-counter-logo.png";
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from "react";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); // Define el tipo de anchorEl
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => { // Define el tipo de event
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const renderAuthButtons = () => {
    const currentPath = location.pathname;

    const buttonStyles = (path: string) => ({ // Define el tipo de path
      backgroundColor: currentPath === path ? "#9575cd" : "inherit",
      color: currentPath === path ? "#ffffff" : "inherit",
    });

    if (!isAuthenticated) {
      return (
        <>
          <Button
            color="inherit"
            onClick={() => navigate("/login")}
            style={buttonStyles("/login")}
          >
            Iniciar sesión
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate("/register")}
            style={buttonStyles("/register")}
          >
            Registrarse
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            color="inherit"
            onClick={() => { navigate("/users"); handleMenuClose(); }}
            style={buttonStyles("/users")}
          >
            Mis clientes
          </Button>
          <Button
            color="inherit"
            onClick={() => { navigate("/config"); handleMenuClose(); }}
            style={buttonStyles("/config")}
          >
            Configurar tabla
          </Button>
          <Button
            color="inherit"
            onClick={() => { navigate("/numbers"); handleMenuClose(); }}
            style={buttonStyles("/numbers")}
          >
            Mi tabla
          </Button>
          <Button color="inherit" onClick={() => { handleLogout(); handleMenuClose(); }}>
            Salir de sesión
          </Button>
        </>
      );
    }
  };

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "#6b46c1", padding: "0 1rem" }}
    >
      <Toolbar className="flex justify-between items-center">
        <div className="flex items-center" onClick={() => navigate("/")}>
          <img
            src={easyCounterLogo}
            alt="Easy Counter Logo"
            className="w-10 h-auto mr-2 animate-bounce"
          />
          <Typography
            variant="h6"
            component="div"
            style={{
              cursor: "pointer",
              textDecoration: location.pathname === "/" ? "underline" : "none",
            }}
          >
            EasyCOUNTER
          </Typography>
        </div>
        <div className="flex space-x-4 items-center">
          {isMobile ? (
            // Menú de hamburguesa para pantallas pequeñas
            <>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => { navigate("/users"); handleMenuClose(); }}>Mis clientes</MenuItem>
                <MenuItem onClick={() => { navigate("/config"); handleMenuClose(); }}>Configurar tabla</MenuItem>
                <MenuItem onClick={() => { navigate("/numbers"); handleMenuClose(); }}>Mi tabla</MenuItem>
                <MenuItem onClick={() => { handleLogout(); handleMenuClose(); }}>Salir de sesión</MenuItem>
              </Menu>
            </>
          ) : (
            // aqui se puede configurarlos botones para pantallas grandes
            renderAuthButtons()
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
