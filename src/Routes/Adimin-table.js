import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/admin/Header";
import Tables from "../Components/admin/Tables";

export default function Home() {
  return (
    <div>
      <Header></Header>
      <Tables></Tables>
    </div>
  );
}