import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

function Collections() {
  const isPyme = useSelector((state) => state.preRegistro.isPyme);

  const requisitosResidenciales = [
    "✔ RIF con dirección donde se realizará la instalación",
    "✔ Copia de la cédula de identidad",
    "✔ Correo electrónico activo",
    "✔ Número de teléfono activo"
  ];

  const requisitosPyme = [
    "✔ Copia del registro mercantil",
    "✔ Copia de la cédula de identidad del representante legal",
    "✔ RIF de la empresa o comercio",
    "✔ RIF del representante legal",
    "✔ Correo electrónico activo",
    "✔ Número de teléfono activo"
  ];

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Requisitos
      </Typography>

      <List>
        {(isPyme ? requisitosPyme : requisitosResidenciales).map((requisito) => (
          <ListItem key={requisito}>
            <ListItemText primary={requisito} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Collections;
