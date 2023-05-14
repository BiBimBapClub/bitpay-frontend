import QueryString from "qs";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Header({ startTime }) {
  const location = useLocation();

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const countdown = setInterval(() => {
      var now = new Date();

      var differenceInMilliseconds = startTime.getTime() - now.getTime();

      var differenceInMinutes = Math.floor(
        differenceInMilliseconds / (1000 * 60)
      );
      var differenceInHours = Math.floor(differenceInMinutes / 60);
      var remainingMinutes = differenceInMinutes % 60;

      setHours(differenceInHours);
      setMinutes(remainingMinutes);
    }, 1000);
    return () => clearInterval(countdown);
  }, [startTime]);

  const queryData = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  return (
    <div className="bg-mainOrange h-fit p-5 flex justify-between items-center">
      <div className="bg-white text-sm rounded-3xl px-4 py-2">
        {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}
      </div>
      <div className="text-white text-2xl font-bold">
        테이블 {queryData.tableId}
      </div>
      <a href="order">
        <div className="bg-white text-sm rounded-3xl px-4 py-2 cursor-pointer">
          주문 내역
        </div>
      </a>
    </div>
  );
}
