import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import QueryString from "qs";
import OrderItem from "../Components/OrderItem";
import { getTableHistory } from "../Shared/apis/getHistory";

export default function Order() {
  const location = useLocation();

  const queryData = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  useEffect(() => {
    async function init() {
      const data = getTableHistory(queryData.tableId);
      console.log(data);
    }

    if (queryData.tableId) {
      init();
    }
  }, [queryData]);

  return (
    <>
      <div className="bg-mainOrange h-fit px-5 py-5 flex justify-between items-center">
        <div className="text-white text-2xl">
          <a href="javascript:history.back();">
            <FontAwesomeIcon icon={faAngleLeft} />
          </a>
        </div>
        <div className="text-white text-2xl font-bold">
          테이블 {queryData.tableId}
        </div>
        <div></div>
      </div>
      <ul>
        <li>
          <OrderItem></OrderItem>
        </li>
        <li>
          <OrderItem></OrderItem>
        </li>
        <li>
          <OrderItem></OrderItem>
        </li>
        <li>
          <OrderItem></OrderItem>
        </li>
        <li>
          <OrderItem></OrderItem>
        </li>
      </ul>
    </>
  );
}
