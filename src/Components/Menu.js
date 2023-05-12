import React, { useState } from "react";
import img1 from "../images/img1.jpg";

export default function Menu() {
  return (
    <div className="flex flex-col justify-center items-center p-5 w-full">
      <img src={img1} alt="menu1" className="h-1/1 w-1/1" />
      <div className="text-lg text-center">닭강정</div>
      <div className="text-sm text-center">10000원</div>
    </div>
  );
}
