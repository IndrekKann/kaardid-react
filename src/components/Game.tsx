import React, { useState, useEffect } from "react";
import axios from "axios";

interface IGame {
  id: string;
  name: string;
  image: string;
}

const defaultGames: IGame[] = [];

export const Game: React.FC = () => {
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
      <ul className="games">
        <table>
          {games.map((game) => (
            <td key={game.id}>
              <img src={game.image} className="Game-Icon" alt={game.name} />
              <h3>{game.name}</h3>
            </td>
          ))}
        </table>
      </ul>
    </div>
  );
};

export default Game;
