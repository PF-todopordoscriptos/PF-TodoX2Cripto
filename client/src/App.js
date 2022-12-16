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
      </div>
    </ThemeProvider>
  );
}

export default App;
