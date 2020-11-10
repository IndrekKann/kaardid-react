import React from "react";
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

const JoinCreate: React.FC = () => {
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
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={6}>6</MenuItem>
                      <MenuItem value={7}>7</MenuItem>
                      <MenuItem value={8}>8</MenuItem>
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
