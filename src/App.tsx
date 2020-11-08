import React from "react";
import "./App.css";
import Game from "./components/Game";
import logo from "./assets/logo.png";

function App() {
  return (
    <div className="App">
      <img src={logo} className="Logo" alt="logo" />
      <Game />
    </div>
  );
}

export default App;
