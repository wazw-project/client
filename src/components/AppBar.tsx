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
          {userStore.userFromFireBase &&
            <div>
              <Stack direction="row" spacing={2}>
                <Avatar src={userStore.userFromFireBase.photoURL} />
                {/* alt={userStore.userFromFireBase.displayName} sx={{ bgcolor: deepOrange[500] }} */}
              </Stack>
            </div>
          }
            {userStore.user &&
            <>
              <Button color="inherit" onClick={() => logOut()}>log out</Button>
              <Button color="inherit" onClick={() => system()}>your system</Button>
            </>
          }
          <Button color="inherit" onClick={() => Allsystem()}>all system</Button>
          <Button color="inherit" onClick={() => About()}>about</Button>
          {userStore.user === null &&
            <Button color="inherit" onClick={() => login()}>if you have a system or location login here</Button>}
          <img style={{marginLeft:'50%'}} src={logo} alt="Logo" />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default observer(OurAppBar)