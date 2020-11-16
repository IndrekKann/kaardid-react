export interface IActiveGame {
  id: string;
  name: string;
  code: string;
  maxPlayers: number;
  isActive: boolean;
  board: any;
  players: any;
}
