import React from "react";
import "./App.css";
import Index from "./components/Index";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import JoinCreate from "./components/JoinCreate";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/:gameName" component={JoinCreate} />
        <Route path="/" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
