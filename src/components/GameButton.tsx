import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

interface IGameButton {
  id: string;
  name: string;
  image: string;
}

const defaultGames: IGameButton[] = [];

const GameButton: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState(defaultGames);

  useEffect(() => {
    axios
      .get<IGameButton[]>("http://localhost:5000/api/games")
      .then((reponse) => {
        setGames(reponse.data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="App">
          <ul className="games">
            <table>
              {games.map((game) => (
                <Link to={`/game/${game.name}`}>
                  <td key={game.id}>
                    <img
                      src={game.image}
                      className="Game-Icon"
                      alt={game.name}
                    />
                    <h3>{game.name}</h3>
                  </td>
                </Link>
              ))}
            </table>
          </ul>
        </div>
      )}
    </>
  );
};

export default GameButton;
