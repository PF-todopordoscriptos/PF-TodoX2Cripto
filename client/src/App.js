import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Footer from "./components/Footer/Footer.jsx";
import FAQ from "./components/FAQ/FAQ.jsx";
import Chart from "./components/Chart/Chart";

function App() {
  return (
    <div className="App">
      <h1>TODO POR 2 CRIPTO</h1>
      <BrowserRouter>
        <Route exact path={"/"} component={LandingPage} />
        <Route exact path={"/FAQ"} component={FAQ} />
        <Route exact path={["/", "/FAQ"]} component={Footer} />
        <Route path={"/chart/:id"} component={Chart} />
      </BrowserRouter>
    </div>
  );
}

export default App;
