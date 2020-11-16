import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import axios from "axios";
import { theme } from "../theme";
import { ThemeProvider } from "@material-ui/core";
import Logo from "./Logo";
import LoadingSpinner from "./LoadingSpinner";
import { IActiveGame } from "../interfaces/IActiveGame";

const defaultGame: IActiveGame = {
  id: "",
  name: "",
  code: "",
  maxPlayers: 0,
  isActive: false,
  board: null,
  players: null,
};

interface Props extends RouteComponentProps<{ gameName: string; id: string }> {}

const ActiveGame: React.FC<Props> = ({ match }) => {
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState(defaultGame);

  useEffect(() => {
    axios
      .get<IActiveGame>(
        "http://localhost:5000/api/activegames/" + match.params.id
      )
      .then((reponse) => {
        setGame(reponse.data);
        setLoading(false);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Logo />
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div>
            <h4>Game mode: {match.params.gameName}</h4>
            <h4>Game id: {match.params.id}</h4>
            <h4>Game code: {game.code}</h4>
            <h4>Players: 1/{game.maxPlayers}</h4>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default ActiveGame;
