import { ColumnModel } from "../models/column.model";
const createNew = async (data: any) => {
  try {
    const result: any = await ColumnModel.createNew(data);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const updateColumn = async (id: string, data: any) => {
  try {
    const updateData = { ...data, updatedAt: Date.now() };
    const result: any = await ColumnModel.updateColumn(id, updateData);
    return result;
  } catch (error) {
    console.log(error);
  }
};
const deleteColumn = async (id: string) => {
  try {
    const updateData = { _destroy: true, updatedAt: Date.now() };
    const result: any = await ColumnModel.deleteColumn(id, updateData);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const columnService = { createNew, deleteColumn, updateColumn };
