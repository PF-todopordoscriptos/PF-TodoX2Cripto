import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
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
import FormLogin from "./components/FormAuth0/FormLogin";
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
          <Route
            exact
            path={["/", "/FAQ", "/home", "/details/:id", "/login", "/profile"]}
            component={Navbar}
          />
          <Route exact path={"/"} component={LandingPage} />
          <Route exact path={"/FAQ"} component={FAQ} />
          <Route path={"/home"} component={Home} />
          <Route path={"/chart/:id"} component={Chart} />
          <Route path={"/details/:id"} component={Details} />
          <Route exact path={"/login"} component={FormLogin} />
          <Route exact path={"/profile"} component={ProtectedRoute} />
          <Route
            exact
            path={["/", "/FAQ", "/home", "/details/:id", "/login", "/profile"]}
            component={Footer}
          />
          <Route exact path={"/calculator"} component={Calculator} />
          <Route exact path={"/comparative"} component={Comparative} />
          <Route exact path={"/admincoins"} component={AdminDashboardCoins} />
          <Route exact path={"/adminusers"} component={AdminDashboardUsers} />
          {/* <Route path="*" component={ErrorPage} /> */}
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
