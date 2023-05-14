import instance from "./index";

const getTableHistory = async (tableId) => {
  const { data } = await instance.get(`/admin/log?tableNumber=${tableId}`);
  return data;
};

export { getTableHistory };
