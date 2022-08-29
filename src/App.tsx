import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import Reset from "./components/login/Reset";
import Dashboard from "./components/login/Dashboard";
import Systems from "./components/system/systems";
import SystemDetails from "./components/system/SystemDetails";
import OurAppBar from './components/AppBar'
import Map from "./components/map/map";
import AddMarker from "./components/map/AutoComplite";
import SearchSystemOfAll from "./components/searchSystemOfAll";
import AutoComplitSystem from "./components/system/autoComplitSystem";

function App() {
  return (
    <div className="app">
      <Router>
      <OurAppBar />
        <Routes>
          <Route path="/" element={<SearchSystemOfAll />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/systems" element={<Systems />} />
          <Route path="/systemDetails/hello/:name/:uid" element={<SystemDetails />} />
          <Route path="/OurAppBar" element={<OurAppBar />} />
          <Route path="/Map/hello/:name" element={<Map/>} />  
          <Route path="/AddMarker" element={<AddMarker/>} /> 
          <Route path="/autoComplitSystem" element={<AutoComplitSystem />} /> 
          <Route path="/searchSystemOfAll" element={<SearchSystemOfAll/>}/>
        </Routes>
      </Router>
    </div>
  );
}
export default App;