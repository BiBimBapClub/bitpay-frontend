import React, { useState } from "react";

export default function PaymentRequest() {
    const [orderItems, setOrderItems] = useState([
        {
          orderNumber: 1,
          tableNumber: 33,
          orderMenu: '닭발x1, 콜라x1',
          totalAmount: 15000,
          paymentConfirmed: false,
        },
        {
            orderNumber: 2,
            tableNumber: 13,
            orderMenu: '닭발x1',
            totalAmount: 10000,
            paymentConfirmed: false,
          },
        // 다른 주문 아이템들...
      ]);
    const [serveItems, setServeItems] = useState([]);
  
    const handleConfirm = (item) => {
      setOrderItems(orderItems.filter((order) => order !== item));
      setServeItems([...serveItems, item]);
    };
    const handleServeComplete = (item) => {
        setServeItems(serveItems.filter((serve) => serve !== item));
      };
    
    return (
        <div className="flex">
          <div className="w-1/2 mt-3">
            {orderItems.map((item) => (
              <div key={item.orderNumber} className="overflow-auto w-full h-fit text-black text-xl font-bold text-center mb-3 ">
                <div className="w-1/5 float-left">{item.orderNumber}</div>
                <div className="w-1/5 float-left">{item.tableNumber}</div>
                <div className="w-1/5 float-left">{item.orderMenu}</div>
                <div className="w-1/5 float-left">{item.totalAmount}</div>
                <div className="w-1/5 float-left">
                  {!item.paymentConfirmed && (
                    <button
                      className="bg-slate-200 w-2/3 border-2 border-solid border-black"
                      onClick={() => handleConfirm(item)}
                    >
                      확인
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
    
          <div className="w-1/2 mt-3">
            {serveItems.map((item) => (
              <div key={item.orderNumber} className="overflow-auto w-full text-black text-xl font-bold text-center mb-3">
                <div className="w-1/5 float-left">{item.orderNumber}</div>
                <div className="w-1/5 float-left">{item.tableNumber}</div>
                <div className="w-1/5 float-left">{item.orderMenu}</div>
                <div className="w-1/5 float-left">{item.totalAmount}</div>
                <div className="w-1/5 float-left">
                    {!item.paymentConfirmed && (
                    <button
                    className="bg-slate-200 w-2/3 border-2 border-solid border-black"
                    onClick={() => handleServeComplete(item)}
                    >
                    서빙완료
                    </button>
                )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
  }