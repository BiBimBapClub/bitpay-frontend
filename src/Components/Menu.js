import React from "react";
export default function Menu({ src, name, price, setSelectedMenu, count }) {
  return (
    <div
      className="justify-center items-center p-2 w-full cursor-pointer"
      onClick={() => {
        setSelectedMenu(name);
      }}
    >
      <img
        src={`${process.env.PUBLIC_URL + src}`}
        alt="menu1"
        className="h-1/1 w-1/1 rounded-md mb-2"
      />
      <div className="text-base font-medium mb-1 leading-6">{name}</div>
      <span className="text-sm text-gray-500">
        {price.toLocaleString()}원{" "}
        {count < 10 && (
          <span className="text-sm text-red-500 font-bold">
            {" "}
            남은수량 {count}개
          </span>
        )}
      </span>
    </div>
  );
}
