import React from "react";
import { Grid, Paper, Box, Typography, Avatar, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
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
              Rodrigo Appel
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
              Martín Appel
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
              Juan Pablo Azambuyo
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
              Juan Cruz Pérez
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
              alt="Facundo Monllor"
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
              Facundo Monllor
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
                href="#"
                underline="none"
              >
                <LinkedInIcon sx={{ fontSize: "50px" }} />
              </Link>
              <Link
                sx={{
                  ":hover": { color: "cardDev.:hover.textWhiteBlack" },
                  color: "cardDev.textWhiteBlack",
                }}
                href="#"
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
              Ramiro Monllor
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
