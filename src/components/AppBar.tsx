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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {userStore.userFromFireBase?.displayName}
          </Typography>
          <img src={userStore.userFromFireBase?.photoURL|| ""}></img>
          {userStore.user &&
            <>
              <Button color="inherit" onClick={() => logOut()}>log out</Button>
              <Button color="inherit" onClick={() => system()}>system</Button>
              <Button color="inherit" onClick={() => Allsystem()}>all system</Button>
            </>
          }
          {userStore.user === null &&
            <Button color="inherit" onClick={() => login()}>if you have a system or location login here</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default OurAppBar