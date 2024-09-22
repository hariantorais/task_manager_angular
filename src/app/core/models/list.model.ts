import {ICard} from "./card.model";

export interface IList{
  id?: number;
  name: string;
  board_id: number;
  cards: ICard[];
}
