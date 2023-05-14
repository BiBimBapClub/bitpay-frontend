import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export default function SheetItem({
  menu,
  setSelectedMenu,
  setRemovedMenu,
  setOrderList,
}) {
  function onClickMinusBtn() {
    setRemovedMenu(menu.name);
    setOrderList((prev) =>
      prev.map((order) => {
        if (order.name === menu.name) {
          return {
            ...menu,
            count: menu.count - 1,
          };
        }
        return order;
      })
    );
  }

  function onClickPlusBtn() {
    setSelectedMenu(menu.name);
    setOrderList((prev) =>
      prev.map((order) => {
        if (order.name === menu.name) {
          return {
            ...menu,
            count: menu.count,
          };
        }
        return order;
      })
    );
  }

  return (
    <div className="flex justify-center items-center my-3 px-3">
      <div className="w-1/2 flex items-center">
        <img
          src={`${process.env.PUBLIC_URL + menu.src}`}
          alt="menu1"
          className="h-20 w-20"
        />
        <div className="ml-3">
          <div className="text-base">{menu.name}</div>
          <div className="text-sm">{menu.price}원</div>
        </div>
      </div>

      <div className="w-1/4 flex justify-start items-center">
        <button
          className="border bg-mainOrange text-white p-1 w-6"
          onClick={onClickMinusBtn}
        >
          {menu.count > 1 ? (
            <FontAwesomeIcon icon={faMinus} />
          ) : (
            <FontAwesomeIcon icon={faTrashCan} />
          )}
        </button>
        <div className="border w-6 py-1 mx-1 text-center">{menu.count}</div>
        <button
          className="border w-6 bg-mainOrange text-white p-1"
          onClick={onClickPlusBtn}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      <div className="text-base w-1/4 flex justify-end">
        ₩ {menu.count * menu.price}원
      </div>
    </div>
  );
}
