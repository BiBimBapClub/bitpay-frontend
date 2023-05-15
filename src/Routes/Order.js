import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import QueryString from "qs";
import OrderItem from "../Components/OrderItem";
import { getTable } from "../Shared/apis/getTables";

export default function Order() {
  const location = useLocation();
  const [table, setTable] = useState();

  const queryData = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const fetchGetTable = async () => {
    const tableData = await getTable(queryData.tableId);
    setTable(tableData);
  };

  useEffect(() => {
    let refetchTable;
    fetchGetTable();

    if (queryData.tableId) {
      fetchGetTable();

      refetchTable = setInterval(async () => {
        const tableData = await getTable(queryData.tableId);
        setTable(tableData);
      }, 1000 * 5);

      return () => clearInterval(refetchTable);
    }
  }, []);

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
        {table?.orders.length > 0 ? (
          table?.orders.map((order) => {
            return (
              <li key={order.id}>
                <OrderItem
                  detailList={order.detailList}
                  status={order.status}
                  totalPrice={order.totalPrice}
                />
              </li>
            );
          })
        ) : (
          <div className="w-full flex justify-center items-center text-center pt-16">
            주문 내역이 없습니다.
          </div>
        )}
      </ul>
    </>
  );
}
