import React, { useState,useEffect } from "react";
import { getMenus } from "../Shared/apis/getMenus";
export default function Menu({ src, name, price, setSelectedMenu,count}) {
  
if(count!=9999){
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
        className="h-1/1 w-1/1"
      />
      <div className="text-lg text-center">{name}</div>
      <div className="text-sm text-center">{price.toLocaleString()}원</div>
      <div className="text-xs text-center pt-1">남은수량 : {count}개</div>
    </div>
  );
}else{
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
        className="h-1/1 w-1/1"
      />
      <div className="text-lg text-center">{name}</div>
      <div className="text-sm text-center">{price.toLocaleString()}원</div>
      
    </div>
  );
}
  
}
