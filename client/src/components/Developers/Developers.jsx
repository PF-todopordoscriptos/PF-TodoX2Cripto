import React from "react";
import { Grid, Paper, Box, Typography, Avatar, Link } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Developers = () => {
  return (
    <>
      <Box
        sx={{
          margin: 3,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Development Team
        </Typography>
      </Box>
      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 4, sm: 10, md: 14 }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            "& > :not(style)": {
              m: 1.5,
              width: 435,
              height: 435,
            },
          }}
        >
          <Paper
            elevation={5}
            sx={{
              display: "flex",
              // flexWrap: "wrap",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="Rodrigo Appel"
              src="https://res.cloudinary.com/dpb5vf1q1/image/upload/v1673306776/1662763345634_l8vvrz.jpg"
              sx={{
                mt: -10,
                width: 150,
                height: 150,
              }}
            />
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                mt: 5,
              }}
            >
              Rodrigo Appel
            </Typography>
            <Typography variant="h6" gutterBottom>
              @rodri_appel
            </Typography>
            <Box
              sx={{
                display: "flex",
                // flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link
                sx={{
                  ":hover": { color: "cardDev.:hover.textWhiteBlack" },
                  color: "cardDev.textWhiteBlack",
                }}
                href="https://www.linkedin.com/in/rodrigoappel/"
                underline="none"
              >
                <LinkedInIcon sx={{ fontSize: "50px" }} />
              </Link>
              <Link
                sx={{
                  ":hover": { color: "cardDev.:hover.textWhiteBlack" },
                  color: "cardDev.textWhiteBlack",
                }}
                href="https://github.com/RodriAppel"
                underline="none"
              >
                <GitHubIcon sx={{ fontSize: "50px" }} />
              </Link>
            </Box>
          </Paper>
          <Paper
            elevation={5}
            sx={{
              display: "flex",
              // flexWrap: "wrap",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="Martín Appel"
              src="https://res.cloudinary.com/dpb5vf1q1/image/upload/v1673306546/1661973940354_rid3ih.jpg"
              sx={{
                mt: -10,
                width: 150,
                height: 150,
              }}
            />
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                mt: 5,
              }}
            >
              Martín Appel
            </Typography>
            <Typography variant="h6" gutterBottom>
              @tin_appel
            </Typography>
            <Box
              sx={{
                display: "flex",
                // flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link
                sx={{
                  ":hover": { color: "cardDev.:hover.textWhiteBlack" },
                  color: "cardDev.textWhiteBlack",
                }}
                href="https://www.linkedin.com/in/martinappelprogramador/"
                underline="none"
              >
                <LinkedInIcon sx={{ fontSize: "50px" }} />
              </Link>
              <Link
                sx={{
                  ":hover": { color: "cardDev.:hover.textWhiteBlack" },
                  color: "cardDev.textWhiteBlack",
                }}
                href="https://github.com/TinoProgramer"
                underline="none"
              >
                <GitHubIcon sx={{ fontSize: "50px" }} />
              </Link>
            </Box>
          </Paper>
          <Paper
            elevation={5}
            sx={{
              display: "flex",
              // flexWrap: "wrap",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="Juan Pablo Azambuyo"
              src="https://res.cloudinary.com/dpb5vf1q1/image/upload/v1673306937/1660788009318_wsbcfd.jpg"
              sx={{
                mt: -10,
                width: 150,
                height: 150,
              }}
            />
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                mt: 5,
              }}
            >
              Juan Pablo Azambuyo
            </Typography>
            <Typography variant="h6" gutterBottom>
              @juanpi_az
            </Typography>
            <Box
              sx={{
                display: "flex",
                // flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link
                sx={{
                  ":hover": { color: "cardDev.:hover.textWhiteBlack" },
                  color: "cardDev.textWhiteBlack",
                }}
                href="https://www.linkedin.com/in/juan-pablo-azambuyo/"
                underline="none"
              >
                <LinkedInIcon sx={{ fontSize: "50px" }} />
              </Link>
              <Link
                sx={{
                  ":hover": { color: "cardDev.:hover.textWhiteBlack" },
                  color: "cardDev.textWhiteBlack",
                }}
                href="https://github.com/PabloAza89"
                underline="none"
              >
                <GitHubIcon sx={{ fontSize: "50px" }} />
              </Link>
            </Box>
          </Paper>
          <Paper
            elevation={5}
            sx={{
              display: "flex",
              // flexWrap: "wrap",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="Juan Cruz Pérez"
              src="https://res.cloudinary.com/dpb5vf1q1/image/upload/v1673307475/58a3ea3f-ce4e-42a3-8274-a616acb7304d_kphw7u.jpg"
              sx={{
                mt: -10,
                width: 150,
                height: 150,
              }}
            />
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                mt: 5,
              }}
            >
              Juan Cruz Pérez
            </Typography>
            <Typography variant="h6" gutterBottom>
              @juan_perez
            </Typography>
            <Box
              sx={{
                display: "flex",
                // flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link
                sx={{
                  ":hover": { color: "cardDev.:hover.textWhiteBlack" },
                  color: "cardDev.textWhiteBlack",
                }}
                href="https://www.linkedin.com/in/juan-cruz-perez-fullstack-dev/"
                underline="none"
              >
                <LinkedInIcon sx={{ fontSize: "50px" }} />
              </Link>
              <Link
                sx={{
                  ":hover": { color: "cardDev.:hover.textWhiteBlack" },
                  color: "cardDev.textWhiteBlack",
                }}
                href="https://github.com/Juanchosss1"
                underline="none"
              >
                <GitHubIcon sx={{ fontSize: "50px" }} />
              </Link>
            </Box>
          </Paper>
          {/* <Paper
            elevation={5}
            sx={{
              display: "flex",
              // flexWrap: "wrap",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="Thiago Yoel Lifschitz"
              //   src=
              sx={{
                mt: -10,
                width: 150,
                height: 150,
              }}
            />
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                mt: 5,
              }}
            >
              Thiago Yoel Lifschitz
            </Typography>
            <Typography variant="h6" gutterBottom>
              @
            </Typography>
            <Box
              sx={{
                display: "flex",
                // flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link
                sx={{
                  ":hover": { color: "cardDev.:hover.textWhiteBlack" },
                  color: "cardDev.textWhiteBlack",
                }}
                href=""
                underline="none"
              >
                <LinkedInIcon sx={{ fontSize: "50px" }} />
              </Link>
              <Link
                sx={{
                  ":hover": { color: "cardDev.:hover.textWhiteBlack" },
                  color: "cardDev.textWhiteBlack",
                }}
                href=""
                underline="none"
              >
                <GitHubIcon sx={{ fontSize: "50px" }} />
              </Link>
            </Box>
          </Paper> */}
          <Paper
            elevation={5}
            sx={{
              display: "flex",
              // flexWrap: "wrap",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="Facundo Monllor"
              src="https://res.cloudinary.com/dpb5vf1q1/image/upload/v1673307271/1668525992950_ae2slm.jpg"
              sx={{
                mt: -10,
                width: 150,
                height: 150,
              }}
            />
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                mt: 5,
              }}
            >
              Facundo Monllor
            </Typography>
            <Typography variant="h6" gutterBottom>
              @facu_monllor
            </Typography>
            <Box
              sx={{
                display: "flex",
                // flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link
                sx={{
                  ":hover": { color: "cardDev.:hover.textWhiteBlack" },
                  color: "cardDev.textWhiteBlack",
                }}
                href="https://www.linkedin.com/in/facundo-monllor/"
                underline="none"
              >
                <LinkedInIcon sx={{ fontSize: "50px" }} />
              </Link>
              <Link
                sx={{
                  ":hover": { color: "cardDev.:hover.textWhiteBlack" },
                  color: "cardDev.textWhiteBlack",
                }}
                href="https://github.com/facundo-monllor"
                underline="none"
              >
                <GitHubIcon sx={{ fontSize: "50px" }} />
              </Link>
            </Box>
          </Paper>
          <Paper
            elevation={5}
            sx={{
              display: "flex",
              // flexWrap: "wrap",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="Ramiro Monllor"
              src="https://res.cloudinary.com/dpb5vf1q1/image/upload/v1673307183/1658597397093_ndy0m0.jpg"
              sx={{
                mt: -10,
                width: 150,
                height: 150,
              }}
            />
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                mt: 5,
              }}
            >
              Ramiro Monllor
            </Typography>
            <Typography variant="h6" gutterBottom>
              @rami_monllor
            </Typography>
            <Box
              sx={{
                display: "flex",
                // flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link
                sx={{
                  ":hover": { color: "cardDev.:hover.textWhiteBlack" },
                  color: "cardDev.textWhiteBlack",
                }}
                href="https://www.linkedin.com/in/ramiro-monllor/"
                underline="none"
              >
                <LinkedInIcon sx={{ fontSize: "50px" }} />
              </Link>
              <Link
                sx={{
                  ":hover": { color: "cardDev.:hover.textWhiteBlack" },
                  color: "cardDev.textWhiteBlack",
                }}
                href="https://github.com/ramiro-monllor"
                underline="none"
              >
                <GitHubIcon sx={{ fontSize: "50px" }} />
              </Link>
            </Box>
          </Paper>
          <Paper
            elevation={5}
            sx={{
              display: "flex",
              // flexWrap: "wrap",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="Ricardo Suarez"
              src="https://res.cloudinary.com/dpb5vf1q1/image/upload/v1673307600/1658786277144_y2ztex.jpg"
              sx={{
                mt: -10,
                width: 150,
                height: 150,
              }}
            />
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                mt: 5,
              }}
            >
              Ricardo Suarez
            </Typography>
            <Typography variant="h6" gutterBottom>
              @ricardosuab93
            </Typography>
            <Box
              sx={{
                display: "flex",
                // flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link
                sx={{
                  ":hover": { color: "cardDev.:hover.textWhiteBlack" },
                  color: "cardDev.textWhiteBlack",
                }}
                href="https://www.linkedin.com/in/ricardosuab93"
                underline="none"
              >
                <LinkedInIcon sx={{ fontSize: "50px" }} />
              </Link>
              <Link
                sx={{
                  ":hover": { color: "cardDev.:hover.textWhiteBlack" },
                  color: "cardDev.textWhiteBlack",
                }}
                href="https://github.com/ricardosuab93"
                underline="none"
              >
                <GitHubIcon sx={{ fontSize: "50px" }} />
              </Link>
            </Box>
          </Paper>
        </Box>
      </Grid>
    </>
  );
};

export default Developers;
