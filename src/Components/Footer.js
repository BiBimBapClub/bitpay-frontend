import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

export default function Footer({ onClickBtn }) {
  return (
    <div className="bg-white fixed bottom-0 inset-x-0 p-2 rounded-t-2xl shadow-[0px_0px_10px_rgba(0,0,0,0.8)]">
      <div className="flex justify-between items-center">
        <div className="px-4 py-2">총 0개</div>
        <div className="text-black text-2xl font-bold ">
          <button onClick={onClickBtn}>
            <FontAwesomeIcon icon={faAngleUp} />
          </button>
        </div>
        <div className="text-mainOrange px-4 py-2">0원</div>
      </div>
    </div>
  );
}
