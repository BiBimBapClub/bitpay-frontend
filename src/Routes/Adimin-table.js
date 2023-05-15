import React, { useLayoutEffect, useState } from "react";
import Header from "../Components/admin/Header";
import Tables from "../Components/admin/Tables";
import Modal from "../Components/Modal";

export default function AdminTable() {
  const [pwInput, setPwInput] = useState("");
  const [openModal, setOpenModal] = useState(true);

  const pw = "sexysunjae";

  useLayoutEffect(() => {
    const savedPwd = localStorage.getItem("PWD");

    if (savedPwd && JSON.parse(savedPwd) === pw) {
      setOpenModal(false);
    }
  }, []);

  return (
    <div>
      <Header></Header>
      <Tables></Tables>
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
              className="peer block bg-white w-full border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              vaue={pwInput}
              onChange={(e) => setPwInput(e.target.value)}
            />
            <p
              className={`mt-2 ${
                pw !== pwInput && pwInput !== "" ? "visible" : "invisible"
              } peer-invalid:visible text-pink-600 text-sm mb-2`}
            >
              비밀번호를 입력해주세요
            </p>
            <button
              className="p-3 bg-mainOrange rounded-lg text-white shadow-none"
              onClick={() => {
                if (pw === pwInput) {
                  setOpenModal(false);
                  localStorage.setItem("PWD", JSON.stringify(pwInput));
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
