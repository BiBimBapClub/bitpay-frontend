import React, { useState } from "react";
export default function Menu({ src, name, price, setSelectedMenu }) {
  return (
    <div
      className="flex flex-col justify-center items-center p-5 w-full cursor-pointer"
      onClick={() => {
        setSelectedMenu(name);
      }}
    >
      <img src={`${process.env.PUBLIC_URL+src}`} alt="menu1" className="h-1/1 w-1/1" />
      <div className="text-lg text-center">{name}</div>
      <div className="text-sm text-center">{price}원</div>
    </div>
  );
}
