import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export default function OrderItem() {
  return (
    <div className="flex justify-between items-center my-3 px-5 pt-3">
      <div className="flex justify-center items-center w-fit">
        <img src={`${process.env.PUBLIC_URL}+odol.png`} alt="menu1" className="h-20 w-20" />
        <div className="ml-4">
          <div className="text-xl">닭강정</div>
          <div className="text-sm">총 10,000원</div>
        </div>
      </div>
      <div className="bg-white text-green rounded-3xl px-5 py-2">결제완료</div>
    </div>
  );
}
