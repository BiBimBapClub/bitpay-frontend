import instance from "./index";

const getMenus = async () => {
  const { data } = await instance.get("/menus");
  return data;
};

export { getMenus };
