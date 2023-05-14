import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import {getTables,postCleanFinish,postOut,postIn} from "../../Shared/apis/getTables";

const Table = () => {
  const navigate = useNavigate();
  const navigateToDetail = (index) => {
    navigate("/admin/"+index)
  };
  const [tableData, setTableData] = useState([
    { number: "table:1", status: '청소완료'},
    { number: "table:2", status: '청소완료'},
    { number: "table:3", status: '청소완료' },
    { number: "table:4", status: '청소완료' },
    { number: "table:5", status: '청소완료'},
    { number: "table:6", status: '청소완료' },
    { number: "table:7", status: '청소완료' },
    { number: "table:8", status: '청소완료'},
    { number: "table:9", status: '청소완료' },
    { number: "table:10", status: '청소완료' },
    { number: "table:11", status: '청소완료'},
    { number: "table:12", status: '청소완료'},
    { number: "table:13", status: '청소완료'},
    { number: "table:14", status: '청소완료'},
    { number: "table:15", status: '청소완료'},
    { number: "table:16", status: '청소완료'},
    { number: "table:17", status: '청소완료'},
    { number: "table:18", status: '청소완료'},
    { number: "table:19", status: '청소완료'},
    { number: "table:20", status: '청소완료'},
    { number: "table:21", status: '청소완료'},
    { number: "table:22", status: '청소완료'},
    { number: "table:23", status: '청소완료'},
    { number: "table:24", status: '청소완료'},
    { number: "table:25", status: '청소완료'},
    { number: "table:26", status: '청소완료'},
    { number: "table:27", status: '청소완료'},
    { number: "table:28", status: '청소완료'},
    { number: "table:29", status: '청소완료'},
    { number: "table:30", status: '청소완료'},
    { number: "table:31", status: '청소완료'},
    { number: "table:32", status: '청소완료'},
    { number: "table:33", status: '청소완료'},
    { number: "table:34", status: '청소완료'},
    { number: "table:35", status: '청소완료'},
    { number: "table:36", status: '청소완료'},
    { number: "table:37", status: '청소완료'},
    { number: "table:38", status: '청소완료'},
    { number: "table:39", status: '청소완료'},
    { number: "table:40", status: '청소완료'},
    { number: "table:41", status: '청소완료'},
    { number: "table:42", status: '청소완료'},
    { number: "table:43", status: '청소완료'},
    { number: "table:44", status: '청소완료'},
    { number: "table:45", status: '청소완료'},
    { number: "table:46", status: '청소완료'},
  ]
  );
  const fetchData = async () => {
    const tables = await getTables();
    setTableData(tables.data);
    console.log(tables)
  };
  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);
  
  const handleCleaned = (index) => {
    let num = index.split(":")[1]
    console.log(num)
   postCleanFinish(num)
   fetchData()
  };
  const handleOut = (index) => {
    let num = index.split(":")[1]
    console.log(num)
    postOut(num)
    fetchData()
   };
   const handleIn = (index) => {
    let num = index.split(":")[1]
    console.log(num)
    postIn(num)
    fetchData()
   };
  const handleStatusChange = (index, newStatus) => {
    setTableData((prevData) => {
      const newData = [...prevData];
      newData[index].status = newStatus;

      return newData;
    });
  };
  

  const renderStatusRow = (status, index, time) => {
    console.log(status)
    if (status === '청소요청') {
      return (
        <>
          <td className="border pl-4 py-2 bg-red-500 text-white">치워주세요</td>
          <td className="border pl-4 py-2">
            <button className="bg-slate-200 w-2/3 border-2 border-solid border-black" onClick={() => handleCleaned(index)}>
              완료
            </button>
          </td>
        </>
      );
    } else if (status === '사용중') {
     
      return (
        <>
          <td className="border pl-4 py-2">{time}</td>
          <td className="border pl-4 py-2">
            <button className="bg-slate-200 w-2/3 border-2 border-solid border-black" onClick={() => handleOut(index)}>
              퇴장
            </button>
          </td>
        </>
      );
    } else if (status === '청소완료') {
      return (
        <>
          <td className="bg-blue-500 text-white border pl-4 py-2">클린</td>
          <td className="border pl-4 py-2">
            <button className="bg-slate-200 w-2/3 border-2 border-solid border-black" onClick={() => handleIn(index)}>
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
              <td className="border px-4 py-2 cursor-pointer " onClick={() => navigateToDetail(row.number.split(":")[1])}>{row.number.split(":")[1]}</td>
              {renderStatusRow(row.status, row.number, row.updatedTime)}
            </tr>
          ))}
        </tbody>
      </table>
      <table className="w-1/2 mr-4">
        <tbody>
          {evenRows?.map((row, index) => (
            <tr key={index} className="bg-gray-100"  >
              <td className="border px-4 py-2 cursor-pointer" onClick={() => navigateToDetail(row.number.split(":")[1])} >{row.number.split(":")[1]}</td>
              {renderStatusRow(row.status, row.number, row.updatedTime)}
            </tr>
          ))}
 </tbody>
      </table>
    </div>
  );
};


export default Table;
