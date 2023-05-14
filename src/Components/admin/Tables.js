import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import {getTables,postCleanFinish,postOut,postIn} from "../../Shared/apis/getTables";

const Table = () => {
  const navigate = useNavigate();
  const navigateToDetail = (index) => {
    navigate("/admin/"+index)
  };
  const [tableData, setTableData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const tables = await getTables();
      setTableData(tables.data);

    };
  
    const interval = setInterval(fetchData, 5000);
  
    return () => clearInterval(interval);
  }, []);
  

  const handleStatusChange = (index, newStatus) => {
    setTableData((prevData) => {
      const newData = [...prevData];
      newData[index].status = newStatus;

      return newData;
    });
  };
  

  const renderStatusRow = (status, index, time) => {
    if (status === '퇴장') {
      return (
        <>
          <td className="border pl-4 py-2 bg-red-500 text-white">치워주세요</td>
          <td className="border pl-4 py-2">
            <button className="bg-slate-200 w-2/3 border-2 border-solid border-black" onClick={() => handleStatusChange(index, '입장')}>
              완료
            </button>
          </td>
        </>
      );
    } else if (status === '완료') {
     
      return (
        <>
          <td className="border pl-4 py-2">{time}</td>
          <td className="border pl-4 py-2">
            <button className="bg-slate-200 w-2/3 border-2 border-solid border-black" onClick={() => handleStatusChange(index, '퇴장')}>
              퇴장
            </button>
          </td>
        </>
      );
    } else if (status === '입장') {
      return (
        <>
          <td className="bg-blue-500 text-white border pl-4 py-2">클린</td>
          <td className="border pl-4 py-2">
            <button className="bg-slate-200 w-2/3 border-2 border-solid border-black" onClick={() => handleStatusChange(index, '완료')}>
              입장
            </button>
          </td>
        </>
      );
    } else {
      return null;
    }
  };

  const oddRows = tableData?.filter((row, index) => index % 2 === 0);
  const evenRows = tableData?.filter((row, index) => index % 2 === 1);

  return (
    <div className="flex">
      <table className="w-1/2 mr-4">
        <tbody>
          {oddRows?.map((row, index) => (
            <tr key={index} className="bg-gray-100" >
              <td className="border px-4 py-2 cursor-pointer " onClick={() => navigateToDetail(row.number)}>{row.number}</td>
              {renderStatusRow(row.status, index * 2, row.time)}
            </tr>
          ))}
        </tbody>
      </table>
      <table className="w-1/2 mr-4">
        <tbody>
          {evenRows?.map((row, index) => (
            <tr key={index} className="bg-gray-100"  >
              <td className="border px-4 py-2 cursor-pointer" onClick={() => navigateToDetail(row.number)} >{row.number}</td>
              {renderStatusRow(row.status, index * 2 + 1, row.time)}
            </tr>
          ))}
 </tbody>
      </table>
    </div>
  );
};


export default Table;
