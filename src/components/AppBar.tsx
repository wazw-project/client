import * as React from 'react';
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import userStore from '../store/userStore';
import { observer } from 'mobx-react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import logo from '../style/מושלם.png';
import "../style/Dashboard.css";
import logo_closet from '../style/closet.png'
const OurAppBar = () => {
  const navigate = useNavigate();

  const logOut = () => {
    navigate('/Dashboard')
  }
  const login = () => {
    navigate('/Login')
  }
  const system = () => {
    navigate('/systems')
  }
  const Allsystem = () => {
    navigate('/searchSystemOfAll')
  }
  const About = () => {
    navigate('/About')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
    
          <img style={{ width: '80px', height: "80px", marginLeft: "-1%" }} src={logo_closet} alt="Logo" />
          <h2 style={{ marginLeft: "2%" }}>The closet</h2>
      
          {userStore.user === null &&
            <Button sx={{ marginLeft: "2%" }} color="inherit" onClick={() => login()}> Login </Button>}

          {userStore.user &&
            <>

              <Button sx={{ marginLeft: "1%" }} color="inherit" onClick={() => logOut()}>log out</Button>
              <Button sx={{ marginLeft: "1%" }} color="inherit" onClick={() => system()}>your system</Button>
            </>
          }

          <Button sx={{ marginLeft: "1%" }} color="inherit" onClick={() => Allsystem()}>all system</Button>
          <Button sx={{ marginLeft: "1%" }} color="inherit" onClick={() => About()}>about</Button>
          {userStore.userFromFireBase &&
            <div style={{marginLeft:"40%"}}>
              <Stack direction="row" spacing={2}>
              <h2>{userStore.userFromFireBase.displayName}</h2>
              <div style={{marginTop:"5%"}}>
              <Avatar  src={userStore.userFromFireBase.photoURL} />
              </div>
             
                
                {/* alt={userStore.userFromFireBase.displayName} sx={{ bgcolor: deepOrange[500] }} */}
              </Stack>
            </div>
          }

        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default observer(OurAppBar)