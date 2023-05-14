import React, { useState } from "react";

export default function Detail() {
    return (
      <div className=" h-fit flex justify-between items-center">
          <div className="w-full h-12 flex justify-between items-center text-black text-xl font-bold text-center float-left border-2 border-solid border-black">
            <div className="w-1/5 float-left ">로그번호</div>
            <div className="w-1/5 float-left">테이블번호</div>
            <div className="w-1/5 float-left">주문자</div>
            <div className="w-1/5 float-left">type</div>
            <div className="w-1/5 float-left">description</div>
            <div className="w-1/5 float-left">timestamp</div>
            </div>
      </div>
    );
  }