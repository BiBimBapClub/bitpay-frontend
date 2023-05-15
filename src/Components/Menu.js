import React from "react";
export default function Menu({ src, name, price, setSelectedMenu, count }) {
  return (
    <div
      className="justify-center items-center p-5 w-full cursor-pointer"
      onClick={() => {
        setSelectedMenu(name);
      }}
    >
      <img
        src={`${process.env.PUBLIC_URL + src}`}
        alt="menu1"
        className="h-1/1 w-1/1 rounded-md mb-2"
      />
      <div className="text-lg font-medium mb-1">{name}</div>
      <div className="text-sm text-gray-500">
        {price.toLocaleString()}원 {count !== 9999 && ` · 남은수량 ${count}개`}
      </div>
    </div>
  );
}
