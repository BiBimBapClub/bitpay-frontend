import React, { useEffect, useState } from "react";
import SheetItem from "./SheetItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import QueryString from "qs";

export default function Sheet({
  onClickBtn,
  totalCount,
  totalPrice,
  orderList,
  setSelectedMenu,
  setRemovedMenu,
}) {
  const location = useLocation();
  const [sheetItems, setSheetItems] = useState([]);

  const queryData = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  useEffect(() => {
    orderList.forEach((item) => {
      if (item.count !== 0) {
        setSheetItems((current) => [
          ...current,
          <li>
            <SheetItem
              menu={item}
              setSelectedMenu={setSelectedMenu}
              setRemovedMenu={setRemovedMenu}
            ></SheetItem>
          </li>,
        ]);
      }
    });
  }, []);

  const onClickOrder = () => {
    window.location.href = `supertoss://send?bank=신한&accountNo=110188949230&origin=linkgen&amount=${totalPrice}&msg=${queryData.tableId}테이블`;
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-mainOrange flex justify-center items-center w-full px-2">
        <div className="text-white w-1/3 px-4 py-2">총 {totalCount}개</div>
        <div className="text-black text-2xl font-bold w-1/3 flex justify-center">
          <button onClick={onClickBtn} className="text-white">
            <FontAwesomeIcon icon={faAngleDown} />
          </button>
        </div>
        <div className="text-white w-1/3 flex justify-end px-4 py-2">
          {totalPrice}원
        </div>
      </div>
      <ul className="w-full pb-24">{sheetItems}</ul>
      <div className="absolute bottom-0 bg-white w-full h-fit flex justify-center items-center">
        <button
          type="button"
          className="bg-mainOrange text-white text-lg w-11/12 h-14 rounded-xl m-6"
          onClick={onClickOrder}
        >
          주문하기
        </button>
      </div>
    </div>
  );
}
