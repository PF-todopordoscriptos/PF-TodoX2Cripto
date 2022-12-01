import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  return (
    <div className="App">
      <h1>Cripto Bros</h1>
      <h1>Prueba 3</h1>


      <h1> richard rey de reyes</h1>
      <h1> rami puto</h1>

      <h1> facu maquinaaa</h1>

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
