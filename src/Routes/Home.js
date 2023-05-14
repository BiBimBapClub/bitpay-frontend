import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import Header from "../Components/Header";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import Sheet from "../Components/Sheet";
import Menus from "../Menus.json";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [orderList, setOrderList] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [removedMenu, setRemovedMenu] = useState("");

  useEffect(() => {
    Menus.forEach((Menu) => {
      setOrderList((current) => [
        ...current,
        {
          name: Menu.name,
          price: Menu.price,
          count: 0,
        },
      ]);
    });
  }, []);

  useEffect(() => {
    orderList.forEach((item) => {
      if (item.name === selectedMenu) {
        item.count += 1;
        setTotalCount((current) => current + 1);
        setTotalPrice((current) => current + item.price);
      }
    });
    setSelectedMenu("");
  }, [selectedMenu]);

  useEffect(() => {
    orderList.forEach((item) => {
      if (item.count > 1 && item.name === removedMenu) {
        item.count -= 1;
        setTotalCount((current) => current - 1);
        setTotalPrice((current) => current - item.price);
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
      <BottomSheet open={open} snapPoints={() => 700}>
        <Sheet
          onClickBtn={onClickBottomSheet}
          totalCount={totalCount}
          totalPrice={totalPrice}
          orderList={orderList}
          setSelectedMenu={setSelectedMenu}
          setRemovedMenu={setRemovedMenu}
        ></Sheet>
      </BottomSheet>
    </>
  );
}
