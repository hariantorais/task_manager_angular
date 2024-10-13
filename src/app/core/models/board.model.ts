import {IList} from "./list.model";

export interface IBoard {
  id?: number;
  name: string;
  user_id: number;
  lists: IList[];
}
