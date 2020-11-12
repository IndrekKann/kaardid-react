import React, { useState, useEffect } from "react";
import axios from "axios";
import { RouteComponentProps } from "react-router";
import {
  TextField,
  MenuItem,
  Select,
  Button,
  ThemeProvider,
  FormControl,
} from "@material-ui/core";
import Logo from "./Logo";
import { theme } from "../theme";
import { IGame } from "../interfaces/IGame";

interface Props extends RouteComponentProps<{ gameName: string }> {}

const defaultGame: IGame = {
  id: "",
  name: "",
  image: "",
  minPlayers: 0,
  maxPlayers: 0,
};

const JoinCreate: React.FC<Props> = ({ match }) => {
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState(defaultGame);

  useEffect(() => {
    axios
      .get<IGame>("http://localhost:5000/api/games/" + match.params.gameName)
      .then((reponse) => {
        setGame(reponse.data);
        setLoading(false);
      });
  }, []);

  const menuItems = [];
  for (let i = game.minPlayers; i <= game.maxPlayers; i++) {
    menuItems.push(i);
  }

  console.log(game);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Logo />
        <div className="Game-Join-Create">
          <h4>Your name</h4>
          <TextField
            required
            id="outlined-required"
            defaultValue=""
            variant="outlined"
          />
          <table>
            <td>
              <ul>
                <FormControl>
                  <li>
                    <h4>Players</h4>
                    <Select
                      style={{ width: 223 }}
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      variant="outlined"
                    >
                      {menuItems.map((i) => (
                        <MenuItem value={i}>{i}</MenuItem>
                      ))}
                    </Select>
                  </li>
                  <br />
                  <li>
                    <Button variant="contained" color="primary">
                      <b>CREATE</b>
                    </Button>
                  </li>
                </FormControl>
              </ul>
            </td>
            <td>
              <ul>
                <FormControl>
                  <li>
                    <h4>Game code</h4>
                    <TextField
                      required
                      id="outlined-required"
                      defaultValue=""
                      variant="outlined"
                    />
                  </li>
                  <br />

                  <li>
                    <Button variant="contained" color="primary">
                      <b>JOIN</b>
                    </Button>
                  </li>
                </FormControl>
              </ul>
            </td>
          </table>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default JoinCreate;
