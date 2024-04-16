import React from "react";
import { Typography } from "@mui/material";

const Home: React.FC = () => {
  return (
    <div>
      <Typography variant="h3" align="center" gutterBottom>
        Bienvenido a esta seccion de la App
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        El contenido de esta sección será una tabla de números.
      </Typography>
    </div>
  );
};

export default Home;
