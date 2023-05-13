import React, { useState } from "react";
import img1 from "../images/img1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export default function SheetItem() {
  return (
    <div className="flex justify-around items-center my-3">
      <div className="flex justify-center items-center w-fit">
        <img src={img1} alt="menu1" className="h-20 w-20" />
        <div className="ml-3">
          <div className="text-base">닭강정</div>
          <div className="text-sm">10,000원</div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="border bg-mainOrange text-white p-1 mx-1">
          <FontAwesomeIcon icon={faTrashCan} />
          <FontAwesomeIcon icon={faMinus} />
        </div>
        <div className="border p-1 mx-1">2</div>
        <div className="border bg-mainOrange text-white p-1 mx-1">
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
      <div className="text-base">₩ 10,000원</div>
    </div>
  );
}
