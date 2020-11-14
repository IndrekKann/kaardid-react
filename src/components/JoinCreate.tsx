import React, { useState, useEffect } from "react";
import axios from "axios";
import { RouteComponentProps } from "react-router";
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
                players: game.minPlayers,
                code: "",
              }}
              validationSchema={ValidationSchema}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                // make async call
                setSubmitting(false);
                console.log("submit: ", data);
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
