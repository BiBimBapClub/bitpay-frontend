import React from "react";
import ReactModal from "react-modal";

const Modal = ({
  isOpen,
  closeModal,
  message,
  description,
  button,
  shouldCloseOnOverlayClick = true,
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none",
      boderRadius: 20,
      padding: 0,
      boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
      width: "80%",
    },
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      ariaHideApp={false}
    >
      <div className="flex flex-col p-10 rounded-lg">
        <span className="font-bold text-xl pb-2">{message}</span>
        {description()}
        {button()}
      </div>
    </ReactModal>
  );
};

export default Modal;
