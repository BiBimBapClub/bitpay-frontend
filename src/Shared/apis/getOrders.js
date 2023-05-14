// http://117.16.137.229:8080/orders

import instance from "./index";

const getOrders = async () => {
  const data = await instance.get("/orders");
  return data;
};

export default getOrders;
