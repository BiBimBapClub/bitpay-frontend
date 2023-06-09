import React, { useEffect, useState } from "react";
import SheetItem from "./SheetItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faClipboard } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import QueryString from "qs";
import Modal from "./Modal";
import postOrder from "../Shared/apis/postOrder";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import useTimer from "./Timer";
import { getTable } from "../Shared/apis/getTables";

export default function Sheet({
  updatedTime,
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
  const timer = useTimer({ updatedTime });
  const [isFirstOrder, setIsFirstOrder] = useState(true);

  const fetchGetTable = async () => {
    const tableData = await getTable(queryData.tableId);

    tableData.orders.forEach((order) => {
      console.log(order.status);
      if (order.status === "ORDER_STATUS_COMPLETE") {
        setIsFirstOrder(false);
      }
    });
  };

  useEffect(() => {
    fetchGetTable();
  }, []);

  const queryData = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const toHexValue = (value) => {
    return (value * 524288).toString(16);
  };

  const createOrder = async () => {
    // send order to server
    try {
      const res = await postOrder(
        queryData.tableId,
        orderList
          .filter((order) => order.count > 0)
          .map((order) => {
            return {
              menu_id: order.id,
              count: order.count,
            };
          })
      );
      console.log(res);
    } catch (err) {
      if (err.response && err.response.status === 400) alert(err.response.data);
    } finally {
      setOrderList((prev) =>
        prev.map((value) => {
          return {
            ...value,
            count: 0,
          };
        })
      );
      closeSheet();
      setIsOpen(false);
    }
  };

  const onClickToss = () => {
    const bank = "우리은행";
    const accountNo = "1002037127421";

    window.open(
      `supertoss://send?bank=${bank}&accountNo=${accountNo}&origin=linkgen&amount=${totalPrice}&msg=${queryData.tableId}테이블`,
      "_blank"
    );

    createOrder();
  };

  const onClickKakao = () => {
    const userId = "Ej8zkz2IC";
    const amount = toHexValue(totalPrice);

    window.open(`https://qr.kakaopay.com/${userId}${amount}`, "_blank");

    createOrder();
  };

  const onClickSend = () => {
    alert(
      "입금내역을 확인중입니다.\n주문내역 페이지에서 결제상태를 확인해주세요."
    );
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
      {isFirstOrder ? (
        <p className="pt-4">최초 주문금액은 14,000원 이상이어야합니다.</p>
      ) : null}

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
          onClick={() => {
            if (totalCount > 0 && timer.hours + timer.minutes !== 0) {
              setIsOpen(true);
            }
          }}
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
            <br />- 별도로 송금하는 경우{" "}
            <CopyToClipboard
              text="우리은행 1002-037-127421"
              onCopy={() => toast("계좌번호가 복사되었습니다.")}
            >
              <span className="font-bold underline underline-offset-2">
                <FontAwesomeIcon icon={faClipboard} className="mr-1" />
                우리은행 1002-037-127421
              </span>
            </CopyToClipboard>
            으로 {totalPrice.toLocaleString()}원을 송금해주세요!
            <ToastContainer
              className="font-semibold"
              position="bottom-center"
              limit={1}
              closeButton={false}
              autoClose={2000}
              hideProgressBar
            />
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
              <span>별도로 송금하기</span>
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
