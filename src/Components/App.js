import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "../Routes/Home";
import Order from "../Routes/Order";
import AdminTable from "../Routes/Adimin-table"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/admin" element={<AdminTable />}/>
      </Routes>
    </Router>
  );
}

export default App;
