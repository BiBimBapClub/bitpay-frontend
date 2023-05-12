import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import Header from "../Components/Header";
import Nav from "../Components/Nav";
import Menu from "../Components/Menu";
import Footer from "../Components/Footer";
import Sheet from "../Components/Sheet";

export default function Home() {
  const [open, setOpen] = useState(true);

  const onClickBottomSheet = () => {
    setOpen((current) => !current);
  };

  return (
    <div>
      <Header></Header>
      <Nav></Nav>
      <div className="grid grid-cols-2 w-full">
        <Menu></Menu>
        <Menu></Menu>
      </div>
      <Footer onClickBtn={onClickBottomSheet}></Footer>
      <BottomSheet open={open} snapPoints={() => 700}>
        <Sheet onClickBtn={onClickBottomSheet}></Sheet>
      </BottomSheet>
    </div>
  );
}
