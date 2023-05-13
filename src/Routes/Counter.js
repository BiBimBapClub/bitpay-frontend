import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/pos/Header";
import TableHeader from "../Components/pos/TableHeader";
import PaymentRequest from "../Components/pos/PaymentRequest";
export default function Counter() {
  return (
    <div>
      <Header></Header>
      <TableHeader></TableHeader>
      <PaymentRequest></PaymentRequest>
    </div>
  );
}