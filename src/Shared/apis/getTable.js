import instance from "./index";

const getTable = async (tableId) => {
  const data = await instance.get(`/table/${tableId}`);
  return data;
};

const getTables = async () => {
  const data = await instance.get("/");
  return data;
};

export { getTable, getTables };
