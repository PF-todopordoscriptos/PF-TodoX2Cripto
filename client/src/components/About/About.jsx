import React from "react";
import { Box, Paper, Typography } from "@mui/material";

const About = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        "& > :not(style)": {
          m: 10,
          width: 855,
          height: 455,
        },
      }}
    >
      <Paper
        elevation={5}
        sx={{
          backgroundColor: "rgb(168, 135, 187)",
          border: "2px solid #684477",
          borderRadius: "0.8rem",
        }}
      >
        <Typography variant="h2" gutterBottom sx={{ margin: "1rem" }}>
          About
        </Typography>
        <Typography variant="h4" gutterBottom sx={{ margin: "1rem" }}>
          This is the final project of SoyHenry's programming bootcamp. It is a
          web application for buying and selling cryptocurrencies.
        </Typography>
      </Paper>
    </Box>
  );
};

export default About;
