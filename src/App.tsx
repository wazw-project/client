import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Reset from "./components/Reset";
import Dashboard from "./components/Dashboard";
import Systems from "./components/systems";
import SystemDetails from "./components/SystemDetails";
import OurAppBar from './components/AppBar'
import SimpleMap from "./components/SimpleMapp";
import AddMarker from "./components/AddMarker";

function App() {
  return (
    <div className="app">
         
      <Router>
      <OurAppBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/systems" element={<Systems />} />
          <Route path="/systemDetails/hello/:name/:uid" element={<SystemDetails />} />
          <Route path="/OurAppBar" element={<OurAppBar />} />
          <Route path="/simpleMap" element={<SimpleMap/>} />  
          <Route path="/AddMarker" element={<AddMarker/>} />  
        </Routes>
      </Router>
    </div>
  );
}
export default App;