import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export default function SheetItem({
  menu,
  setSelectedMenu,
  setRemovedMenu,
  setOrderList,
}) {
  function onClickMinusBtn() {
    // setRemovedMenu(menu.name);
    setOrderList((prev) =>
      prev.map((order) => {
        if (order.id === menu.id) {
          return {
            ...menu,
            count: menu.count - 1,
          };
        } else {
          return order;
        }
      })
    );
  }

  function onClickPlusBtn() {
    // setSelectedMenu(menu.name);
    setOrderList((prev) =>
      prev.map((order) => {
        if (order.id === menu.id) {
          return {
            ...menu,
            count: menu.count + 1,
          };
        } else {
          return order;
        }
      })
    );
  }

  return (
    <div className="flex justify-center items-center my-3 px-3">
      <div className="w-full flex items-center">
        <img
          src={`${process.env.PUBLIC_URL + menu.src}`}
          alt="menu1"
          className="h-20 w-20 rounded-md border-2 border-slate-200"
        />
        <div className="ml-3">
          <div className="text-base font-medium">{menu.name}</div>
          <div className="text-sm text-gray-500">
            {menu.price.toLocaleString()}원
          </div>
        </div>
      </div>

      <div className="flex flex-col w-1/4 justify-center aligns-center ml-2">
        <div className="text-sm flex text-gray-500 mb-1">
          ₩ {(menu.count * menu.price).toLocaleString()}원
        </div>
        <div className="flex justify-start items-center">
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
      </div>
    </div>
  );
}
