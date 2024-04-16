import React from "react";
import { Typography } from "@mui/material";

const Home: React.FC = () => {
  return (
    <div>
      <Typography variant="h3" align="center" gutterBottom>
        Bienvenido a esta seccion de la App
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        Aqui se podra configurar una tabla de numeros.
      </Typography>
    </div>
  );
};

export default Home;
