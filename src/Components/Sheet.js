import React, { useState } from "react";
import SheetItem from "./SheetItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export default function Sheet({ onClickBtn }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-mainOrange flex justify-between items-center w-full px-4">
        <div className="text-white px-4 py-2">총 0개</div>
        <div className="text-black text-2xl font-bold ">
          <button onClick={onClickBtn} className="text-white">
            <FontAwesomeIcon icon={faAngleDown} />
          </button>
        </div>
        <div className="text-white px-4 py-2">0원</div>
      </div>
      <ul className="w-full">
        <li>
          <SheetItem></SheetItem>
        </li>
        <li>
          <SheetItem></SheetItem>
        </li>
        <li>
          <SheetItem></SheetItem>
        </li>
        <li>
          <SheetItem></SheetItem>
        </li>
        <li>
          <SheetItem></SheetItem>
        </li>
        <li>
          <SheetItem></SheetItem>
        </li>
        <li>
          <SheetItem></SheetItem>
        </li>
        <li>
          <SheetItem></SheetItem>
        </li>
        <li>
          <SheetItem></SheetItem>
        </li>
      </ul>
    </div>
  );
}
