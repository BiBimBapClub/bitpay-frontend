import React, { useEffect, useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import Header from "../Components/Header";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import Sheet from "../Components/Sheet";
import Menus from "../Menus.json";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [removedMenu, setRemovedMenu] = useState("");
  const totalCount = orderList.reduce((acc, val) => acc + val.count, 0);
  const totalPrice = orderList.reduce(
    (acc, val) => acc + val.count * val.price,
    0
  );

  console.log(orderList);

  useEffect(() => {
    Menus.forEach((Menu) => {
      setOrderList((current) => [
        ...current,
        {
          name: Menu.name,
          price: Menu.price,
          count: 0,
          src: Menu.image,
        },
      ]);
    });
  }, []);

  useEffect(() => {
    orderList.forEach((item) => {
      if (item.name === selectedMenu) {
        item.count += 1;
      }
    });
    setSelectedMenu("");
  }, [selectedMenu]);

  useEffect(() => {
    orderList.forEach((item) => {
      if (item.count > 1 && item.name === removedMenu) {
        item.count -= 1;
      }
    });
    setRemovedMenu("");
  }, [removedMenu]);

  const onClickBottomSheet = () => {
    setOpen((current) => !current);
  };

  return (
    <>
      <Header></Header>
      <Nav setSelectedMenu={setSelectedMenu}></Nav>

      <Footer
        onClickBtn={onClickBottomSheet}
        totalCount={totalCount}
        totalPrice={totalPrice}
      ></Footer>
      <BottomSheet open={open} snapPoints={() => 700} blocking={false}>
        <Sheet
          onClickBtn={onClickBottomSheet}
          totalCount={totalCount}
          totalPrice={totalPrice}
          orderList={orderList}
          setOrderList={setOrderList}
          setSelectedMenu={setSelectedMenu}
          setRemovedMenu={setRemovedMenu}
        />
      </BottomSheet>
    </>
  );
}
