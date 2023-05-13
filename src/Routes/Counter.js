import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/pos/Header";
import TableHeader from "../Components/pos/TableHeader";
export default function Counter() {
  return (
    <div>
      <Header></Header>
      <TableHeader></TableHeader>
    </div>
  );
}