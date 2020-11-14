import React, { useState, useEffect } from "react";
import axios from "axios";
import { RouteComponentProps } from "react-router";
import { Formik, Form, Field } from "formik";
import {
  TextField,
  MenuItem,
  Select,
  Button,
  ThemeProvider,
} from "@material-ui/core";
import Logo from "./Logo";
import { theme } from "../theme";
import { IGame } from "../interfaces/IGame";
import LoadingSpinner from "./LoadingSpinner";

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

  const menuItems: number[] = [];
  for (let i = game.minPlayers; i <= game.maxPlayers; i++) {
    menuItems.push(i);
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Logo />
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="Game-Join-Create">
            <Formik
              initialValues={{
                name: "",
                players: "",
                code: "",
              }}
              onSubmit={(data) => {
                console.log("submit: ", data);
              }}
            >
              {() => (
                <Form>
                  <div>
                    <Field name="name" type="input" as={TextField} />
                  </div>
                  <div>
                    <Field name="players" type="select" as={Select}>
                      {menuItems.map((i) => (
                        <MenuItem key={i} value={i}>
                          {i}
                        </MenuItem>
                      ))}
                    </Field>
                    <Field name="code" type="input" as={TextField}></Field>
                  </div>
                  <div>
                    <Button type="submit" variant="contained" color="primary">
                      Create
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                      Join
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default JoinCreate;
