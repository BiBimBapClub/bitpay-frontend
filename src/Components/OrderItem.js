import React from "react";
import Menus from "../Menus.json";

export default function OrderItem({ detailList, status, totalPrice }) {
  const menu = Menus.find((menu) => menu.id === detailList[0].menuId);
  let orderStatus = "";

  switch (status) {
    case "ORDER_STATUS_BEFORE_PAYMENT":
      orderStatus = "결제대기중";
      break;
    case "ORDER_STATUS_PREPARING":
      orderStatus = "서빙대기중";
      break;
    case "ORDER_STATUS_COMPLETE":
      orderStatus = "서빙완료";
      break;
    default:
      break;
  }

  return (
    <div className="flex justify-between items-center my-3 px-5 pt-3">
      <div className="flex justify-center items-center w-fit">
        <img
          src={`${process.env.PUBLIC_URL + menu.image}`}
          alt={menu.name}
          className="h-20 w-20"
        />
        <div className="ml-4">
          <div className="text-xl text-ellipsis overflow-hidden">
            {menu.name}
          </div>
          <div className="text-sm">총 {totalPrice}원</div>
        </div>
      </div>
      <div className="bg-white text-green rounded-3xl px-5 py-2 whitespace-nowrap">
        {orderStatus}
      </div>
    </div>
  );
}
