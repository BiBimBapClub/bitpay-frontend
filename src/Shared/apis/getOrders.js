// http://117.16.137.229:8080/orders

import instance from "./index";

const getOrders = async () => {
  const data = await instance.get("/orders");
  return data;
};
const getPaymentRequest = async () => {
  const data = await instance.get("/orders?status=ORDER_STATUS_BEFORE_PAYMENT");
  return data;
};
const getServeRequest = async () => {
  const data = await instance.get("/orders?status=ORDER_STATUS_PREPARING");
  return data;
};
const confirmPayment = async () => {
  
};

export {getOrders,getPaymentRequest,getServeRequest,confirmPayment};
