import React, { useState } from "react";
import img1 from "../images/img1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export default function SheetItem({ menu, setSelectedMenu, setRemovedMenu }) {
  const [menus, setMenus] = useState(menu);

  function onClickMinusBtn() {
    if (menus.count > 0) {
      console.log(menus.name);
      setRemovedMenu(menus.name);
      setMenus({
        name: menus.name,
        price: menus.price,
        count: menus.count - 1,
      });
    }
  }

  function onClickPlusBtn() {
    setSelectedMenu(menus.name);
    setMenus({
      name: menus.name,
      price: menus.price,
      count: menus.count + 1,
    });
  }

  return (
    <div className="flex justify-center items-center my-3 px-3">
      <div className="w-[40%] flex items-center">
        <img src={img1} alt="menu1" className="h-20 w-20" />
        <div className="ml-3">
          <div className="text-base">{menus.name}</div>
          <div className="text-sm">{menus.price}원</div>
        </div>
      </div>

      <div className="w-[30%] flex justify-center items-center">
        <button
          className="border bg-mainOrange text-white p-1"
          onClick={onClickMinusBtn}
        >
          {menus.count > 1 ? (
            <FontAwesomeIcon icon={faMinus} />
          ) : (
            <FontAwesomeIcon icon={faTrashCan} className="px-[1px]" />
          )}
        </button>
        <div className="border px-2 py-1 mx-1">{menus.count}</div>
        <button
          className="border bg-mainOrange text-white p-1"
          onClick={onClickPlusBtn}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      <div className="text-base w-[30%] flex justify-end">
        ₩ {menus.count * menus.price}원
      </div>
    </div>
  );
}
