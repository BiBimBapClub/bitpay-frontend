import instance from "./index";

const getTables = async () => {
  const data = await instance.get("/");
  return data;
};

export default getTables;
