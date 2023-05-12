import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Nav from "../Components/Nav";
import Menu from "../Components/Menu";

export default function Home() {
  return (
    <div>
      <Header></Header>
      <Nav></Nav>
      <Menu></Menu>
    </div>
  );
}
