import React from "react";
import "./App.css";
import Index from "./components/Index";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import JoinCreate from "./components/JoinCreate";
import ActiveGame from "./components/ActiveGame";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/:gameName" exact component={JoinCreate} />
        <Route path="/:gameName/:id" exact component={ActiveGame} />
        <Route path="/" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
