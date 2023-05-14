import React, { useEffect, useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import Header from "../Components/Header";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import Sheet from "../Components/Sheet";
import Menus from "../Menus.json";
import { useLocation } from "react-router-dom";
import QueryString from "qs";
import Modal from "../Components/Modal";
import { getTable } from "../Shared/apis/getTables";
import { getMenus } from "../Shared/apis/getMenus";

export default function Home() {
  const location = useLocation();
  const [table, setTable] = useState();
  const [open, setOpen] = useState(false);
  const [tableIdInput, setTableIdInput] = useState("");
  const [openModal, setOpenModal] = useState(true);
  const [orderList, setOrderList] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [removedMenu, setRemovedMenu] = useState("");
  const [timer, setTimer] = useState({
    hours: 0,
    minutes: 1,
  });
  const totalCount = orderList.reduce((acc, val) => acc + val.count, 0);
  const totalPrice = orderList.reduce(
    (acc, val) => acc + val.count * val.price,
    0
  );

  const queryData = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const startTime = new Date(table?.updatedTime);
  startTime.setHours(startTime.getHours() + 2);

  useEffect(() => {
    const countdown = setInterval(() => {
      var now = new Date();

      var differenceInMilliseconds = startTime.getTime() - now.getTime();

      var differenceInMinutes = Math.floor(
        differenceInMilliseconds / (1000 * 60)
      );
      var differenceInHours = Math.floor(differenceInMinutes / 60);
      var remainingMinutes = differenceInMinutes % 60;

      setTimer({
        hours: differenceInHours,
        minutes: remainingMinutes,
      });
    }, 1000);

    if (timer.hours === 0 && timer.minutes === 0) {
      clearInterval(countdown);
    }

    return () => clearInterval(countdown);
  }, [startTime, timer.hours, timer.minutes]);

  useEffect(() => {
    const savedTableId = localStorage.getItem("TABLE_ID");

    if (savedTableId && JSON.parse(savedTableId) === queryData.tableId) {
      setOpenModal(false);
    }

    Menus.forEach((Menu) => {
      setOrderList((current) => [
        ...current,
        {
          id: Menu.id,
          name: Menu.name,
          price: Menu.price,
          count: 0,
          src: Menu.image,
        },
      ]);
    });

    (async function init() {
      const tableData = await getTable(queryData.tableId);
      setTable(tableData);
    })();

    const refetchTable = setInterval(async () => {
      const tableData = await getTable(queryData.tableId);
      setTable(tableData);
    }, 1000 * 60);

    return () => clearInterval(refetchTable);
  }, []);

  useEffect(() => {
    orderList.forEach((item) => {
      if (item.name === selectedMenu) {
        item.count += 1;
      }
    });
    setSelectedMenu("");
  }, [selectedMenu]);

  useEffect(() => {
    orderList.forEach((item) => {
      if (item.count > 1 && item.name === removedMenu) {
        item.count -= 1;
      }
    });
    setRemovedMenu("");
  }, [removedMenu]);

  const onClickBottomSheet = () => {
    setOpen((current) => !current);
  };

  return (
    <>
      <Header timer={timer}></Header>
      <Nav setSelectedMenu={setSelectedMenu}></Nav>

      <Footer
        onClickBtn={onClickBottomSheet}
        totalCount={totalCount}
        totalPrice={totalPrice}
      ></Footer>
      <BottomSheet open={open} snapPoints={() => 700} blocking={false}>
        <Sheet
          timer={timer}
          onClickBtn={onClickBottomSheet}
          totalCount={totalCount}
          totalPrice={totalPrice}
          orderList={orderList}
          setOrderList={setOrderList}
          setSelectedMenu={setSelectedMenu}
          setRemovedMenu={setRemovedMenu}
          closeSheet={() => setOpen(false)}
        />
      </BottomSheet>
      <Modal
        shouldCloseOnOverlayClick={false}
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
        message={"테이블 번호를 입력해주세요"}
        description={() => <></>}
        button={() => (
          <>
            <input
              type="text"
              name="search"
              className="peer block bg-white w-full border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              vaue={tableIdInput}
              onChange={(e) => setTableIdInput(e.target.value)}
            />
            <p
              class={`mt-2 ${
                queryData.tableId !== tableIdInput && tableIdInput !== ""
                  ? "visible"
                  : "invisible"
              } peer-invalid:visible text-pink-600 text-sm mb-2`}
            >
              테이블 번호를 확인해주세요
            </p>
            <button
              className="p-3 bg-mainOrange rounded-lg text-white shadow-none"
              onClick={() => {
                if (queryData.tableId === tableIdInput) {
                  setOpenModal(false);
                  localStorage.setItem(
                    "TABLE_ID",
                    JSON.stringify(queryData.tableId)
                  );
                }
              }}
            >
              확인
            </button>
          </>
        )}
      />
    </>
  );
}
