import React, { useState } from "react";

export default function TableHeader() {
    return (
      <div className=" h-fit flex justify-between items-center">
          <div className="w-1/2 h-12 flex justify-between items-center text-black text-xl font-bold text-center float-left border-2 border-solid border-black">
            <div className="w-1/5 float-left ">주문번호</div>
            <div className="w-1/5 float-left">테이블번호</div>
            <div className="w-1/5 float-left">주문메뉴</div>
            <div className="w-1/5 float-left">총금액</div>
            <div className="w-1/5 float-left">결제확인</div>
            </div>
          <div className="w-1/2 h-12  flex justify-between items-center text-black text-xl font-bold text-center float-right border-2 border-solid border-black">
          <div className="w-1/5 float-left">주문번호</div>
            <div className="w-1/5 float-left">테이블번호</div>
            <div className="w-1/5 float-left">주문메뉴</div>
            <div className="w-1/5 float-left">총금액</div>
            <div className="w-1/5 float-left">서빙확인</div>
            </div>
      </div>
    );
  }