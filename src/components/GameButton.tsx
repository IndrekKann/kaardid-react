import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import { IGame } from "../interfaces/IGame";

const defaultGames: IGame[] = [];

const GameButton: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState(defaultGames);

  useEffect(() => {
    axios.get<IGame[]>("http://localhost:5000/api/games").then((reponse) => {
      setGames(reponse.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="App">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ul className="games">
          <table>
            <tbody>
              <tr>
                {games.map((game) => (
                  <td key={game.id}>
                    <Link to={`/game/${game.name}`}>
                      <img
                        src={game.image}
                        className="Game-Icon"
                        alt={game.name}
                      />
                      <h3>{game.name}</h3>
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </ul>
      )}
    </div>
  );
};

export default GameButton;
