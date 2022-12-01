import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  return (
    <div className="App">
      <h1>Cripto Bros</h1>

      <BrowserRouter>
        <Route exact path={"/"} component={LandingPage} />
      </BrowserRouter>

      <BrowserRouter>
        <Route exact path={"/"} component={LandingPage} />
      </BrowserRouter>
      
    </div>
  );
}

export default App;
