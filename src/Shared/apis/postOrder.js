import instance from "./index";

const postOrder = async () => {
  const data = await instance.post("/orders", {
    tableNumber: 13,
    orderDetail: [
      { menu_id: 1, count: 3 },
      { menu_id: 2, count: 3 },
    ],
  });
  return data;
};

export default postOrder;
