import React, { useState } from "react";
import Modal from "./Modal";

export default function Menu({ src, name, price, setSelectedMenu }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="flex flex-col justify-center items-center p-5 w-full cursor-pointer"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL + src}`}
          alt="menu1"
          className="h-1/1 w-1/1"
        />
        <div className="text-lg text-center">{name}</div>
        <div className="text-sm text-center">{price}원</div>
      </div>
      <Modal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        message={`${name}을 담으시겠어요?`}
        description={() => <></>}
        button={() => (
          <>
            <button
              className="p-3 bg-mainOrange rounded-lg text-black mb-4"
              onClick={() => {
                setSelectedMenu(name);
                setIsOpen(false);
              }}
            >
              담기
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
    </>
  );
}
