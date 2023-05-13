import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import OrderItem from "../Components/OrderItem";

export default function Order() {
  return (
    <>
      <div className="bg-mainOrange h-fit px-5 py-5 flex justify-between items-center">
        <div className="text-white text-2xl">
          <a href="/">
            <FontAwesomeIcon icon={faAngleLeft} />
          </a>
        </div>
        <div className="text-white text-2xl font-bold">테이블 10</div>
        <div></div>
      </div>
      <ul>
        <li>
          <OrderItem></OrderItem>
        </li>
        <li>
          <OrderItem></OrderItem>
        </li>
        <li>
          <OrderItem></OrderItem>
        </li>
        <li>
          <OrderItem></OrderItem>
        </li>
        <li>
          <OrderItem></OrderItem>
        </li>
      </ul>
    </>
  );
}
