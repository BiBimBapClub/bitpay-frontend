import instance from "./index";

const postOrder = async (tableId, orders) => {
  try {
    const data = await instance.post("/orders", {
      tableNumber: tableId,
      orderDetail: orders,
    });
    return data;
  } catch (err) {
    if (err.response && err.response.status === 400) {
      throw err;
    }
  }
};

export default postOrder;
