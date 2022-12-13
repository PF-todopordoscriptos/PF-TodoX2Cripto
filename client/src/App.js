import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Footer from "./components/Footer/Footer.jsx";
import FAQ from "./components/FAQ/FAQ.jsx";
import Chart from "./components/Chart/Chart";
import Home from "./components/Home/Home";
import Details from "./components/Details/Details";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Profile from "./components/Profile/Profile";
import Form from "./components/Form/Form";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import Comparative from "./components/Comparative/Comparative";
import Calculator from "./components/Calculator/Calculator";
import FormAuth0 from "./components/FormAuth0/FormAuth0";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import AdminDashboardCoins from "../src/components/AdminDashboardCoins/AdminDashboardCoins";
import AdminDashboardUsers from "../src/components/AdminDashboardUsers/AdminDashboardUsers";

const theme = createTheme({
  typography: {
    fontFamily: ["Montserrat"].join(","),
  },
  palette: {
    primary: {
      main: "#0052cc",
      sub: "#F5E024",
      dark: "#1E1E1E",
    },
    secondary: {
      main: "#edf2ff",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* <h1>TODO POR 2 CRIPTO</h1> */}
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <LandingPage />
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
                </>
              }
            />

            <Route path="/FAQ" element={<FAQ />} />
            <Route path="/chart/:id" element={<Chart />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/form" element={<Form />} />
            <Route path="/login" element={<FormAuth0 />} />
            <Route path={"/profile"} element={<ProtectedRoute />} />
            <Route path={"/FAQ"} element={<Navbar />} />
            <Route path={"/home"} element={<Navbar />} />
            <Route path={"/details/:id"} element={<Navbar />} />
            <Route path={"/login"} element={<Navbar />} />
            <Route path={"/profile"} element={<Navbar />} />

            <Route path={"/calculator"} element={<Calculator />} />
            <Route path={"/comparative"} element={<Comparative />} />
            <Route path={"/admincoins"} element={<AdminDashboardCoins />} />
            <Route path={"/adminusers"} element={<AdminDashboardUsers />} />
            <Route path="/errorpage" element={<ErrorPage />} />
            <Route path="*" element={<Navigate to="/errorpage" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
