import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAdmin } from "../../Shared/apis/getAdmin";

export default function Detail() {
    const params = useParams();
    console.log(params.id)
    const [logData, setLogData] = useState([])
 
    useEffect(() => {
        const fetchData = async () => {
            const log = await getAdmin(params.id);
            setLogData(log);
            console.log(log)
            console.log(logData)
          };
          fetchData()
      
        
      }, []);
      
     
    return (
      <div className=" h-fit items-center">
          <div className="w-full h-12 items-center text-black text-xl font-bold text-center  border-2 border-solid border-black">
            <div className="w-1/6 float-left ">로그번호</div>
            <div className="w-1/6 float-left">테이블번호</div>
            <div className="w-1/6 float-left">주문자</div>
            <div className="w-1/6 float-left">type</div>
            <div className="w-1/6 float-left">description</div>
            <div className="w-1/6 float-left">timestamp</div>
            </div>
            {logData?.map((index) => (
            <div className="w-full overflow-auto items-center text-black text-xl font-bold text-center border-2 border-solid border-black">
            <div className="w-1/6 float-left ">{index.id}</div>
            <div className="w-1/6 float-left">{index.tableNumber}</div>
            <div className="w-1/6 float-left">주문자</div>
            <div className="w-1/6 float-left">{index.type}</div>
            <div className="w-1/6 float-left">{index.description}</div>
            <div className="w-1/6 float-left">{index.timestamp}</div>
            </div>
          ))}
      </div>
      
    );
  }