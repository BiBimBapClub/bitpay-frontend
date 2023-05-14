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
const confirmPayment = async (orderId) => {
  const data = await instance.get("/orders/confirm_payment/"+orderId);
  return data;
};
const confirmServe = async (orderId) => {
  const data = await instance.get("/orders/confirm_complete/"+orderId);
  return data;
};
const cancelPayment = async (orderId) => {
  const data = await instance.delete("/orders/"+orderId);
  return data;
};

export {getOrders,getPaymentRequest,getServeRequest,confirmPayment,confirmServe,cancelPayment};
