import React, { useState, useEffect , useMemo } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import LandingPag from "./components/LandingPag/LandingPag";
import Footer from "./components/Footer/Footer.jsx";
import FAQ from "./components/FAQ/FAQ.jsx";
import Chart from "./components/Chart/Chart";
import Home from "./components/Home/Home";
import Details from "./components/Details/Details";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Profile from "./components/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Comparative from "./components/Comparative/Comparative";
import Calculator from "./components/Calculator/Calculator";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import FormLogin from "./components/FormLogin/FormLogin";
import AdminDashboardCoins from "../src/components/AdminDashboardCoins/AdminDashboardCoins";
import AdminDashboardUsers from "../src/components/AdminDashboardUsers/AdminDashboardUsers";
import AdminDashboardChanges from "../src/components/AdminDashboardChanges/AdminDashboardChanges";
import { amber , grey , deepOrange , purple , deepPurple , pink , yellow , lightBlue } from "@mui/material/colors";
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';

function App() {

  const getDesignTokens = (PaletteMode) => ({
    palette: {
      PaletteMode,
      ...(PaletteMode === 'light'
        ? {
            // palette values for light mode
            body: {
              backgroundColor: "#ffffff"
            },
            navbar: {
              background: deepPurple[600],
              button: {
                background: purple[700],
                text: '#ffffff',
                ':hover': {
                  background: purple[500],
                  text: '#000000',
                },
              }
            },
            landingPage: {
              upperHeader: {
                color: '#2a46ad'
              },
              button: {
                background: '#1CB0F6',
                border: '#1899D6',
                text: '#ffffff'
              },
              lowerHeader: {
                color: '#2a46ad'
              }
            },
            footer: {
              background: grey[900],
              divider: purple[500],
              textPurple: purple[500],
              textWhiteBlack: '#ffffff',
              ':hover': {
                textWhiteBlack: purple[500],
              },
            },
          }
        : {
            // palette values for dark mode
            body: {
              backgroundColor: grey[700]
            },
            navbar: {
              background: grey[900],
              button: {
                background: grey[200],
                text: '#000000',
                ':hover': {
                  background: grey[400],
                  text: grey[700],
                },
              }
            },
            landingPage: {
              upperHeader: {
                color: '#ffffff'
              },
              button: {
                background: grey[400],
                border: grey[500],
                text: grey[900]
              },
              lowerHeader: {
                color: '#ffffff'
              }
            },
            footer: {
              background: grey[500],
              divider: grey[900],
              textPurple: '#000000',
              textWhiteBlack: '#000000',
              ':hover': {
                textWhiteBlack: grey[300],
              },
            }
          }
        ),
    },
  });

  const mode = useSelector( state => state.themeMode )

  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (

      <ThemeProvider theme={theme}>
        <Box sx={{ backgroundColor: 'body.backgroundColor' }} className="App">
          {/* <h1>TODO POR 2 CRIPTO</h1> */}
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    {/* <LandingPage /> */}
                    <LandingPag/>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/home"
                element={
                  <>
                    <Navbar />
                    <Home />
                    <Footer />
                  </>
                }
              />

              <Route path="/login" element={ <><Navbar /> <FormLogin /> <Footer /></> } />
              <Route path="/FAQ" element={<><Navbar /> <FAQ /> <Footer /> </>} />
              <Route path="/chart/:id" element={<Chart />} />
              <Route path="/details/:id" element={<Details />} />
              <Route path={"/profile"} element={ <><Navbar />  <ProtectedRoute /> <Footer /></> } />
              <Route path={"/FAQ"} element={<Navbar />} />
              <Route path={"/details/:id"} element={<Navbar />} />
              <Route path={"/calculator"} element={<><Navbar /> <Calculator /> <Footer /> </>} />
              <Route path={"/comparative"} element={<Comparative />} />
              <Route path={"/admincoins"} element={<AdminDashboardCoins />} />
              <Route path={"/adminusers"} element={<AdminDashboardUsers />} />
              <Route path={"/adminchanges"} element={<AdminDashboardChanges />} />
              <Route path="/errorpage" element={<ErrorPage />} />
              <Route path="*" element={<Navigate to="/errorpage" replace />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </ThemeProvider>

  );
}

export default App;
