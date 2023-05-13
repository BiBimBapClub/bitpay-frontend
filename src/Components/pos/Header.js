import React, { useState } from "react";

export default function Header() {
    return (
      <div className="bg-mainOrange h-fit p-3 flex justify-between items-center">
          <div className="w-1/2 text-white text-4xl font-bold text-center float-left">결제요청</div>
          <div className="w-1/2 text-white text-4xl font-bold text-center float-right">서빙요청</div>
      </div>
    );
  }