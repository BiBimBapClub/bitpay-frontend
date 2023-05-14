import React, { useEffect, useState } from "react";
import SheetItem from "./SheetItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import QueryString from "qs";
import Modal from "./Modal";

export default function Sheet({
  onClickBtn,
  totalCount,
  totalPrice,
  orderList,
  setOrderList,
  setSelectedMenu,
  setRemovedMenu,
}) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const queryData = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });

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
      <ul className="w-full pb-24">
        {orderList
          .filter((order) => order.count > 0)
          .map((order) => (
            <li key={order}>
              <SheetItem
                menu={order}
                setOrderList={setOrderList}
                setSelectedMenu={setSelectedMenu}
                setRemovedMenu={setRemovedMenu}
              />
            </li>
          ))}
      </ul>
      <div className="absolute bottom-0 bg-white w-full h-fit flex justify-center items-center">
        <button
          type="button"
          className="bg-mainOrange text-white text-lg w-11/12 h-14 rounded-xl m-6"
          onClick={() => setIsOpen(true)}
        >
          주문하기
        </button>
      </div>
      <Modal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        message={"주문하시겠어요?"}
        description={() => (
          <span className="font-light text-gray-500 pb-4">
            카카오페이의 경우 입금자 명을{" "}
            <strong>{queryData.tableId}테이블</strong>로 변경해주세요!
          </span>
        )}
        button={() => (
          <>
            {" "}
            <button
              className="p-3 rounded-lg text-white mb-4"
              onClick={() => {}}
              style={{ backgroundColor: "#0064FF" }}
            >
              Toss로 송금하기
            </button>
            <button
              className="p-3 rounded-lg text-black mb-4"
              onClick={() => {}}
              style={{ backgroundColor: "#FFEB04" }}
            >
              카카오페이로 송금하기
            </button>
            <button
              className="p-3 bg-black rounded-lg text-white shadow-none"
              onClick={() => setIsOpen(false)}
            >
              취소
            </button>
          </>
        )}
      />
    </div>
  );
}
