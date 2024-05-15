import { useAuth } from "../context/authContext";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const renderAuthButtons = () => {
    if (!isAuthenticated) {
      return (
        <>
          <Button color="inherit" onClick={() => navigate("/login")}>
            Iniciar sesión
          </Button>
          <Button color="inherit" onClick={() => navigate("/register")}>
            Registrarse
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button color="inherit" onClick={() => navigate("/users")}>
            Mis clientes
          </Button>
          <Button color="inherit" onClick={() => navigate("/config")}>
            Configurar tabla
          </Button>
          <Button color="inherit" onClick={() => navigate("/numbers")}>
            Mi tabla
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Salir de sesión
          </Button>
        </>
      );
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          onClick={() => navigate("/")}
        >
          My App
        </Typography>
        {renderAuthButtons()}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
