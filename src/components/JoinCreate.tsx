import React, { useState, useEffect } from "react";
import axios from "axios";
import { RouteComponentProps, Redirect } from "react-router";
import { Formik, Form, Field } from "formik";
import {
  MenuItem,
  Select,
  Button,
  ThemeProvider,
  Grid,
} from "@material-ui/core";
import Logo from "./Logo";
import { theme } from "../theme";
import { IGame } from "../interfaces/IGame";
import LoadingSpinner from "./LoadingSpinner";
import JoinCreateTextField from "../components/JoinCreateTextField";
import "./JoinCreate.css";
import ValidationSchema from "./validation/ValidationSchema";

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
  const [command, setCommand] = useState("");
  const [response, setResponse] = useState("");

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

  if (!!response) {
    return <Redirect to={`/${match.params.gameName}/${response}`} />;
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
                game: match.params.gameName,
                name: "",
                players: game.minPlayers,
                code: "",
                command: command,
              }}
              validationSchema={ValidationSchema}
              onSubmit={(data, { setSubmitting }) => {
                data.command = command;
                setSubmitting(true);
                axios
                  .post<string>("http://localhost:5000/api/activegames", {
                    game: data.game,
                    name: data.name,
                    players: data.players,
                    code: data.code,
                    command: data.command,
                  })
                  .then((response) => {
                    setResponse(response.data);
                  });
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      NAME
                    </Grid>
                    <Grid item xs={12}>
                      <JoinCreateTextField name="name" />
                    </Grid>
                    <br />
                    <br />
                    <Grid item xs={6}>
                      PLAYERS
                    </Grid>
                    <Grid item xs={6}>
                      CODE
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        name="players"
                        type="select"
                        as={Select}
                        variant="outlined"
                        style={{ width: 223 }}
                      >
                        {menuItems.map((i) => (
                          <MenuItem key={i} value={i}>
                            {i}
                          </MenuItem>
                        ))}
                      </Field>
                    </Grid>
                    <Grid item xs={6}>
                      <JoinCreateTextField name="code" />
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        type="submit"
                        onClick={() => {
                          setCommand("CREATE");
                        }}
                        disabled={isSubmitting}
                        variant="contained"
                        color="primary"
                      >
                        Create
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        type="submit"
                        onClick={() => {
                          setCommand("JOIN");
                        }}
                        disabled={isSubmitting}
                        variant="contained"
                        color="primary"
                      >
                        Join
                      </Button>
                    </Grid>
                  </Grid>
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
