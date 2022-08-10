import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Reset from "./components/Reset";
import Dashboard from "./components/Dashboard";
import InsetDividers from "./components/system";
import OneSystem from "./components/system";
import Systems from "./components/systems";
import SystemDetails from "./components/SystemDetails";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/OneSystem" element={<OneSystem />} />
          <Route path="/systems" element={<Systems />} />
           <Route path="/systemDetails" element={<SystemDetails/>}/>
        </Routes>
      </Router>
    </div>
  );
}
export default App;