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
import { onAuthStateChanged,getAuth } from "firebase/auth";
import userStore from "./store/userStore";
import About from "./components/about";
import { ThemeProvider,createTheme } from "@mui/material";


let auth = getAuth();
// let user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
  auth = getAuth();
  user = auth.currentUser;
  userStore.userFromFireBase=user
  debugger
  console.log(userStore.userFromFireBase)     
  console.log(userStore.userFromFireBase.uid)
  userStore.getUser(userStore.userFromFireBase.uid)
  debugger;
  // userStore.addUser(user);
  debugger;  

});

function App() {
  let theme = createTheme();
theme = createTheme(theme, {
  palette: {
    primary: {
      main: "#FF0000",
      light: "#b71c1c",
      dark: "#f44336",
    },
  },
});
  return (
    <div className="app">
       <ThemeProvider theme={theme}>
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
          <Route path="/Map/:name/:id" element={<Map/>} />  
          <Route path="/AddMarker" element={<AddMarker/>} /> 
          <Route path="/autoComplitSystem" element={<AutoComplitSystem />} /> 
          <Route path="/searchSystemOfAll" element={<SearchSystemOfAll/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
      </Router>
      </ThemeProvider>
    </div>
  );
}
export default App;