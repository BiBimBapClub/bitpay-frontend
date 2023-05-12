import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "../Routes/Home";
import Order from "../Routes/Order";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </Router>
  );
}

export default App;
