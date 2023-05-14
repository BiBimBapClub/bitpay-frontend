import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "../Routes/Home";
import Order from "../Routes/Order";
import AdminTable from "../Routes/Adimin-table"
import Counter from "../Routes/Counter"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:tableId" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/admin" element={<AdminTable />}/>
        <Route path="/counter" element={<Counter/>}/>
      </Routes>
    </Router>
  );
}

export default App;
