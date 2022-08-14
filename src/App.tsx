import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Reset from "./components/Reset";
import Dashboard from "./components/Dashboard";
import Systems from "./components/systems";
import SystemDetails from "./components/SystemDetails";
import OurAppBar from './components/AppBar'
function App() {
  return (
    <div className="app">
      <OurAppBar/>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/systems" element={<Systems />} />
          <Route path="/systemDetails/hello/:name/:uid" element={<SystemDetails/>}/>
          <Route path="OurAppBar" element={<OurAppBar/>}/>
        </Routes>
      </Router>
    </div>
  );
}
export default App;