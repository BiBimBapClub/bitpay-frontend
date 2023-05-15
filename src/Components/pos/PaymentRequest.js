import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  getOrders,
  getPaymentRequest,
  getServeRequest,
  confirmPayment,
  confirmServe,
  cancelPayment,
} from "../../Shared/apis/getOrders";
import { getAdmin } from "../../Shared/apis/getAdmin";
import Menus from "../../Menus.json";

export default function PaymentRequest() {
  const [orderItems, setOrderItems] = useState([]);
  const [serveItems, setServeItems] = useState([]);

  // const orderedMenus = Menus.filter((menu) => menu.id === detailList[0].menuId);
  console.log(orderItems);

  const fetchData = async () => {
    const payment = await getPaymentRequest();
    const serve = await getServeRequest();

    setOrderItems(payment.data.reverse());
    setServeItems(serve.data.reverse());
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleConfirm = async (item) => {
    await confirmPayment(item.id);
    await fetchData();
  };
  const handleCancel = async (item) => {
    await cancelPayment(item.id);
    await fetchData();
  };
  const handleServeComplete = async (item) => {
    confirmServe(item.id);
    console.log(serveItems);
  };

  return (
    <div className="flex">
      <div className="w-1/2 mt-3">
        {orderItems?.map((item) => (
          <div
            key={item.id}
            className="overflow-auto w-full h-fit text-black text-xl font-bold text-center mb-3 "
          >
            <div className="w-1/5 float-left">{item.id}</div>
            <div className="w-1/5 float-left">{item.tableNumber}</div>
            <div className="w-1/5 float-left">
              {item.detailList.map((menu) => (
                <span>
                  {Menus.find((m) => m.id === menu.menuId).name} *{" "}
                  {menu.quantity}개 <br />
                  <br />
                </span>
              ))}
            </div>
            <div className="w-1/5 float-left">{item.totalPrice}</div>
            <div className="w-1/5 float-left">
              {!item.paymentConfirmed && (
                <button
                  className="bg-slate-200 w-2/3 border-2 border-solid border-black"
                  onClick={() => handleConfirm(item)}
                >
                  확인
                </button>
              )}
              <button
                className="bg-slate-200 w-2/3 border-2 border-solid border-black mt-1 text-red-600"
                onClick={() => handleCancel(item)}
              >
                거절
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="w-1/2 mt-3">
        {serveItems?.map((item) => (
          <div
            key={item.id}
            className="overflow-auto w-full text-black text-xl font-bold text-center mb-3"
          >
            <div className="w-1/5 float-left">{item.id}</div>
            <div className="w-1/5 float-left">{item.tableNumber}</div>
            <div className="w-1/5 float-left">
              {item.detailList.map((menu) => (
                <span>
                  {Menus.find((m) => m.id === menu.menuId).name} *{" "}
                  {menu.quantity}개 <br />
                  <br />
                </span>
              ))}
            </div>
            <div className="w-1/5 float-left">{item.totalPrice}</div>
            <div className="w-1/5 float-left">
              {!item.paymentConfirmed && (
                <button
                  className="bg-slate-200 w-2/3 border-2 border-solid border-black"
                  onClick={() => handleServeComplete(item)}
                >
                  서빙완료
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
