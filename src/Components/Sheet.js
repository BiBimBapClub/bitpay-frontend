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
  closeSheet,
}) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const queryData = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const toHexValue = (value) => {
    return (value * 524288).toString(16);
  };

  const createOrder = () => {
    // reset orderList's count
    setOrderList((prev) =>
      prev.map((value) => {
        return {
          ...value,
          count: 0,
        };
      })
    );
    closeSheet();
  };

  const onClickToss = () => {
    const bank = "신한";
    const accountNo = "1101889";

    window.open(
      `supertoss://send?bank=${bank}&accountNo=${accountNo}&origin=linkgen&amount=${totalPrice}&msg=${queryData.tableId}테이블`,
      "_blank"
    );

    createOrder();
  };

  const onClickKakao = () => {
    const userId = "Ej8Z73HLr";
    const amount = toHexValue(totalPrice);

    window.open(`https://qr.kakaopay.com/${userId}${amount}`, "_blank");

    createOrder();
  };

  const onClickSend = () => {
    createOrder();
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
          {totalPrice.toLocaleString()}원
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
          onClick={() => totalCount > 0 && setIsOpen(true)}
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
            - 카카오페이의 경우{" "}
            <span className="text-red-500 font-bold">입금자 명</span>을{" "}
            <strong>{queryData.tableId}테이블</strong>로 변경해주세요!
            <br />- 별도로 송금하는 경우 <strong>124-123242123-12 신한</strong>
            으로 {totalPrice.toLocaleString()}원을 송금해주세요!
          </span>
        )}
        button={() => (
          <>
            <button
              className="p-3 rounded-lg text-white mb-4"
              onClick={onClickToss}
              style={{ backgroundColor: "#0064FF" }}
            >
              Toss로 송금하기
            </button>
            <button
              className="p-3 rounded-lg text-black mb-4"
              onClick={onClickKakao}
              style={{ backgroundColor: "#FFEB04" }}
            >
              카카오페이로 송금하기
            </button>
            <button
              className="p-3 bg-mainOrange rounded-lg text-white mb-4"
              onClick={onClickSend}
            >
              별도로 송금하기
            </button>
            <button
              className="p-3 bg-black rounded-lg text-white "
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
