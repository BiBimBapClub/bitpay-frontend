import React, { useState } from "react";
import img1 from "../images/img1.jpg";

export default function Menu() {
  return (
    <div className="flex flex-col w-fit p-5">
      <img src={img1} alt="menu1" className="h-36 w-36" />
      <div className="text-lg text-center">닭강정</div>
      <div className="text-sm text-center">10000원</div>
    </div>
  );
}
