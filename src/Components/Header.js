import QueryString from "qs";
import React from "react";
import { useLocation } from "react-router-dom";
import useTimer from "./Timer";

export default function Header({ table }) {
  const location = useLocation();
  const timer = useTimer({ updatedTime: table?.updatedTime });

  const queryData = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  return (
    <div className="bg-mainOrange h-fit p-5 flex justify-between items-center">
      <div className="bg-white text-sm rounded-3xl px-4 py-2">
        {table?.status === "청소완료"
          ? "--:--"
          : `${timer.hours.toString().padStart(2, "0")}:${timer.minutes
              .toString()
              .padStart(2, "0")}`}
      </div>
      <div className="text-white text-2xl font-bold">
        테이블 {queryData.tableId}
      </div>
      <a href={`/order?tableId=${queryData.tableId}`}>
        <div className="bg-white text-sm rounded-3xl px-4 py-2 cursor-pointer">
          주문 내역
        </div>
      </a>
    </div>
  );
}
