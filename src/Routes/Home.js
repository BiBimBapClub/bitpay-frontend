import React, { useEffect, useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import Header from "../Components/Header";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import Sheet from "../Components/Sheet";
import Menus from "../Menus.json";
import getRemainingFoods from "../Shared/apis/getRemainingFoods";
import getTables from "../Shared/apis/getTables";
import { useLocation } from "react-router-dom";
import QueryString from "qs";
import Modal from "../Components/Modal";

export default function Home() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [tableIdInput, setTableIdInput] = useState("");
  const [openModal, setOpenModal] = useState(true);
  const [orderList, setOrderList] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [removedMenu, setRemovedMenu] = useState("");
  const totalCount = orderList.reduce((acc, val) => acc + val.count, 0);
  const totalPrice = orderList.reduce(
    (acc, val) => acc + val.count * val.price,
    0
  );

  const queryData = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  useEffect(() => {
    Menus.forEach((Menu) => {
      setOrderList((current) => [
        ...current,
        {
          name: Menu.name,
          price: Menu.price,
          count: 0,
          src: Menu.image,
        },
      ]);
    });

    (async function init() {
      const foods = await getRemainingFoods();
      console.log(foods);

      const { data: tables } = await getTables();
      const table = tables.find((value) => value.tableId === queryData.tableId);
    })();
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
      <Header></Header>
      <Nav setSelectedMenu={setSelectedMenu}></Nav>

      <Footer
        onClickBtn={onClickBottomSheet}
        totalCount={totalCount}
        totalPrice={totalPrice}
      ></Footer>
      <BottomSheet open={open} snapPoints={() => 700} blocking={false}>
        <Sheet
          onClickBtn={onClickBottomSheet}
          totalCount={totalCount}
          totalPrice={totalPrice}
          orderList={orderList}
          setOrderList={setOrderList}
          setSelectedMenu={setSelectedMenu}
          setRemovedMenu={setRemovedMenu}
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
              placeholder={queryData.tableId}
              class="peer block bg-white w-full border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
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
