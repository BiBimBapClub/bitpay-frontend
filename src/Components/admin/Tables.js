import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation } from "react-router-dom";

const Table = ({ data }) => {
  const navigate = useNavigate();
  const navigateToDetail = (index) => {
    navigate("/admin/"+index)
  };
  const [tableData, setTableData] = useState(data);

  const handleStatusChange = (index, newStatus) => {
    setTableData((prevData) => {
      const newData = [...prevData];
      newData[index].status = newStatus;

      return newData;
    });
  };
  
  

  const renderStatusRow = (status, index) => {
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
          <td className="border pl-4 py-2">2:00:00</td>
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

  const oddRows = tableData.filter((row, index) => index % 2 === 0);
  const evenRows = tableData.filter((row, index) => index % 2 === 1);

  return (
    <div className="flex">
      <table className="w-1/2 mr-4">
        <tbody>
          {oddRows.map((row, index) => (
            <tr key={index} className="bg-gray-100" >
              <td className="border px-4 py-2 cursor-pointer " onClick={() => navigateToDetail(row.number)}>{row.number}</td>
              {renderStatusRow(row.status, index * 2, row.time)}
            </tr>
          ))}
        </tbody>
      </table>
      <table className="w-1/2 ">
        <tbody>
          {evenRows.map((row, index) => (
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
const App = () => {
  const tableData = [
    { number: 1, status: '퇴장'},
    { number: 2, status: '완료' },
    { number: 3, status: '입장' },
    { number: 4, status: '입장'},
    { number: 5, status: '퇴장' },
    { number: 6, status: '완료' },
    { number: 7, status: '입장'},
    { number: 8, status: '입장'},
  ]
  return <Table data={tableData} />;
};

export default App;
