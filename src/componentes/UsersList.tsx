import React from "react";
import { Typography } from "@mui/material";

const Home: React.FC = () => {
  return (
    <div>
      <Typography variant="h3" align="center" gutterBottom>
        Bienvenido a esta seccion de la App
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        Esta sección contendrá todos los usuarios que se van agregando a la
        aplicación, incluyendo sus datos.
      </Typography>
    </div>
  );
};

export default Home;
