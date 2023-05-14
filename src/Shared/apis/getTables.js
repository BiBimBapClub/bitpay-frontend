import instance from "./index";

const getTables = async () => {
  const data = await instance.get("/tables");
  return data;
};
const getTable = async (tableId) => {
  const data = await instance.get(`/tables/${tableId}`);
  return data;
};
const postCleanFinish = async (tableNumber) => {
  const data = await instance.post("/tables/confirm_cleaned/" + tableNumber);
  return data;
};
const postOut = async (tableNumber) => {
  const data = await instance.post("/tables/confirm_clean/" + tableNumber);
  return data;
};
const postIn = async (tableNumber) => {
  const data = await instance.post("/tables/confirm_active/" + tableNumber);
  return data;
};

export { getTables, getTable, postCleanFinish, postOut, postIn };
