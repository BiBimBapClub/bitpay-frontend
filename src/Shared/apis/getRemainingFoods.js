import instance from "./index";

const getRemainingFoods = async () => {
  const data = await instance.get("/getRemain");
  return data;
};

export default getRemainingFoods;
