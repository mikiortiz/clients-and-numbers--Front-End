import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Hidden,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";

const UserNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <AppBar position="static" style={{ background: "#333" }}>
      <Toolbar>
        {/* Botón de menú para pantallas pequeñas */}
        <Hidden lgUp>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>

        {/* Botones visibles en pantallas grandes */}
        <div style={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Hidden mdDown>
            <Button
              onClick={() => navigate("/")}
              variant="text"
              color={isActive("/") ? "primary" : "inherit"}
              style={{
                marginRight: "10px",
                fontFamily: "fantasy",
                fontWeight: 100,
              }}
            >
              Mi Tabla
            </Button>
            <Button
              onClick={() => navigate("/config")}
              variant="text"
              color={isActive("/config") ? "primary" : "inherit"}
              style={{ fontFamily: "fantasy", fontWeight: 100 }}
            >
              Config Tabla
            </Button>
            <Button
              onClick={() => navigate("/users")}
              variant="text"
              color={isActive("/users") ? "primary" : "inherit"}
              style={{ fontFamily: "fantasy", fontWeight: 100 }}
            >
              Lista de Usuarios
            </Button>
          </Hidden>
        </div>

        {/* Menú desplegable para pantallas pequeñas */}
        <Hidden lgUp>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => {
                navigate("/");
                handleMenuClose();
              }}
            >
              Mi Tabla
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/config");
                handleMenuClose();
              }}
            >
              Config Tabla
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/users");
                handleMenuClose();
              }}
            >
              Lista de Usuarios
            </MenuItem>
          </Menu>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default UserNavbar;
