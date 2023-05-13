import React, { useState } from "react";

export default function TableHeader() {
    return (
      <div className=" h-fit p-3 flex justify-between items-center">
          <div className="w-1/2 text-black text-xl font-bold text-center float-left">
            <div className="w-1/5 float-left">주문번호</div>
            <div className="w-1/5 float-left">테이블번호</div>
            <div className="w-1/5 float-left">주문메뉴</div>
            <div className="w-1/5 float-left">총금액</div>
            <div className="w-1/5 float-left">결제확인</div>
            </div>
          <div className="w-1/2 text-black text-xl font-bold text-center float-right">
          <div className="w-1/5 float-left">주문번호</div>
            <div className="w-1/5 float-left">테이블번호</div>
            <div className="w-1/5 float-left">주문메뉴</div>
            <div className="w-1/5 float-left">총금액</div>
            <div className="w-1/5 float-left">서빙확인</div>
            </div>
      </div>
    );
  }