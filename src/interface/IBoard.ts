import IColumn from "interface/IColumn";

export default interface IBoard {
  id: string;
  columnOrder: string[];
  columns: IColumn[];
}
