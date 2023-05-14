import instance from "./index";

const getAdmin = async (tableNumber) => {
  const { data } = await instance.get("/admin/log?tableNumber="+tableNumber);
  return data;
};

export { getAdmin };
