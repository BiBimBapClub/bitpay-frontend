import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/pos/Header";
import TableHeader from "../Components/pos/TableHeader";
import PaymentRequest from "../Components/pos/PaymentRequest";
import Modal from "../Components/Modal";

export default function Counter() {
  const [open, setOpen] = useState(false);
const [pwInput, setPwInput] = useState("");
const [openModal, setOpenModal] = useState(true);
const pw = "sexysunjae"
  return (
    <div>
      <Header></Header>
      <TableHeader></TableHeader>
      <PaymentRequest></PaymentRequest>
      <Modal
        shouldCloseOnOverlayClick={false}
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
        message={"비밀번호를 입력해주세요"}
        description={() => <></>}
        button={() => (
          <>
            <input
              type="text"
              name="search"
              class="peer block bg-white w-full border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              vaue={pwInput}
              onChange={(e) => setPwInput(e.target.value)}
            />
            <p
              class={`mt-2 ${
                pw !== pwInput && pwInput !== ""
                  ? "visible"
                  : "invisible"
              } peer-invalid:visible text-pink-600 text-sm mb-2`}
            >
              비밀번호를 입력해주세요
            </p>
            <button
              className="p-3 bg-mainOrange rounded-lg text-white shadow-none"
              onClick={() => {
                if (pw === pwInput) {
                  setOpenModal(false);
                }
              }}
            >
              확인
            </button>
          </>
        )}
      />
    </div>
  );
}