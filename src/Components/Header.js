import React from "react";
import { useParams } from "react-router-dom";

export default function Header() {
  const params = useParams()

  return (
    <div className="bg-mainOrange h-fit p-5 flex justify-between items-center">
      <div className="bg-white text-sm rounded-3xl px-4 py-2">00:00</div>
      <div className="text-white text-2xl font-bold">테이블 {params.tableId}</div>
      <a href="order">
        <div className="bg-white text-sm rounded-3xl px-4 py-2 cursor-pointer">
          주문 내역
        </div>
      </a>
    </div>
  );
}
