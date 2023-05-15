import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getTables,
  postCleanFinish,
  postOut,
  postIn,
} from "../../Shared/apis/getTables";

const Table = () => {
  const [tableData, setTableData] = useState([]);
  
  const fetchData = async () => {
    const tables = await getTables();
    setTableData(tables.data);
    console.log(tables);
  };

  useEffect(() => {
    fetchData();
    
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);


  const oddRows = tableData?.filter((row, index) => index % 2 === 0);
  const evenRows = tableData?.filter((row, index) => index % 2 === 1);

  return (
    <div className="flex">
      <table className="w-1/2 mr-4">
        <tbody>
          {oddRows?.map((row) => (
            <TableItem key={row.nunber} table={row} setTableData={setTableData}/>
          ))}
        </tbody>
      </table>
      <table className="w-1/2 mr-4">
        <tbody>
          {evenRows?.map((row) => (
            <TableItem key={row.nunber} table={row} setTableData={setTableData}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TableItem = ({ table,setTableData }) => {
  const [timer, setTimer] = useState({
    hours: 0,
    minutes: 0,
  });
  const navigate = useNavigate();
  const navigateToDetail = (index) => {
    navigate("/admin/" + index);
  };
  const fetchData = async () => {
    const tables = await getTables();
    setTableData(tables.data);
    console.log(tables);
  };
  const handleCleaned = (index) => {
    let num = index.split(":")[1];
    console.log(num);
    postCleanFinish(num);
    fetchData();
  };
  const handleOut = (index) => {
    let num = index.split(":")[1];
    console.log(num);
    postOut(num);
    fetchData();
  };
  const handleIn = (index) => {
    let num = index.split(":")[1];
    console.log(num);
    postIn(num);
    fetchData();
  };

  const startTime = new Date(table?.updatedTime);
  startTime.setHours(startTime.getHours() + 2);

  useEffect(() => {
    const countdown = setInterval(() => {
      var now = new Date();

      var differenceInMilliseconds = startTime.getTime() - now.getTime();

      var differenceInMinutes = Math.floor(
        differenceInMilliseconds / (1000 * 60)
      );
      var differenceInHours = Math.floor(differenceInMinutes / 60);
      var remainingMinutes = differenceInMinutes % 60;

      setTimer({
        hours: differenceInHours,
        minutes: remainingMinutes,
      });
    }, 1000);

    if (timer.hours < 0 || timer.minutes < 0) {
      clearInterval(countdown);
    }

    return () => clearInterval(countdown);
  }, [startTime, timer.hours, timer.minutes]);

  const renderStatusRow = (status, index, time) => {
    if (status === "청소요청") {
      return (
        <>
          <td className="border pl-4 py-2 bg-red-500 text-white">치워주세요</td>
          <td className="border pl-4 py-2">
            <button
              className="bg-slate-200 w-2/3 border-2 border-solid border-black"
              onClick={() => handleCleaned(index)}
            >
              완료
            </button>
          </td>
        </>
      );
    } else if (status === "사용중") {
      return (
        <>
          <td className="border pl-4 py-2">{timer.hours.toString().padStart(2, "0")}:
        {timer.minutes.toString().padStart(2, "0")}</td>
          <td className="border pl-4 py-2">
            <button
              className="bg-slate-200 w-2/3 border-2 border-solid border-black"
              onClick={() => handleOut(index)}
            >
              퇴장
            </button>
          </td>
        </>
      );
    } else if (status === "청소완료") {
      return (
        <>
          <td className="bg-blue-500 text-white border pl-4 py-2">클린</td>
          <td className="border pl-4 py-2">
            <button
              className="bg-slate-200 w-2/3 border-2 border-solid border-black"
              onClick={() => handleIn(index)}
            >
              입장
            </button>
          </td>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <tr className="bg-gray-100">
      <td
        className="border px-4 py-2 cursor-pointer"
        onClick={() => navigateToDetail(table.number.split(":")[1])}
      >
        {table.number.split(":")[1]}
      </td>
      {renderStatusRow(table.status, table.number, table.updatedTime)}
    </tr>
  );
};

export default Table;
