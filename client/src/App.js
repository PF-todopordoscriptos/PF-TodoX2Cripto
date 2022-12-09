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
import Form from "./components/Form/Form";
import Navbar from "./components/Navbar/Navbar";

import Calculator from "./components/Calculator/Calculator";
import FormAuth0 from "./components/FormAuth0/FormAuth0";
import ErrorPage from "./components/ErrorPage/ErrorPage";

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
            path={["/", "/FAQ", "/home", "/details/:id", "/login"]}
            component={Navbar}
          />
          <Route exact path={"/"} component={LandingPage} />
          <Route exact path={"/FAQ"} component={FAQ} />
          <Route path={"/home"} component={Home} />
          <Route path={"/chart/:id"} component={Chart} />
          <Route path={"/details/:id"} component={Details} />
          <Route path={"/form"} component={Form} />
          <Route exact path={"/login"} component={FormAuth0} />
          <Route exact path={"/profile"} component={Profile} />
          <Route exact path={"/calculator"} component={Calculator} />
          <Route path="*" component={ErrorPage} />
          <Route
            exact
            path={["/", "/FAQ", "/home", "/details/:id", "/login"]}
            component={Footer}
          />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
