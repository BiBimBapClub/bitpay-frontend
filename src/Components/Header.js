import React, { useState } from "react";

export default function Header() {
  return (
    <div className="bg-mainOrange h-fit p-3">
      <div className="flex justify-between items-center">
        <div className="bg-white rounded-lg px-4 py-2">00:00</div>
        <div className="text-white text-2xl font-bold">테이블 10</div>
        <div className="bg-white rounded-lg px-4 py-2">주문 내역</div>
      </div>
    </div>
  );
}
