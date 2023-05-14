import instance from "./index";

const postOrder = async (tableId, orders) => {
  const data = await instance.post("/orders", {
    tableNumber: tableId,
    orderDetail: orders,
  });
  return data;
};

export default postOrder;
