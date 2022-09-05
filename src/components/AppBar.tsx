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
          {userStore.userFromFireBase &&
            <div>
              {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {userStore.userFromFireBase && userStore.userFromFireBase.displayName}
              </Typography> */}
              {/* <img src={`${userStore.userFromFireBase.photoURL}`}></img> */}
              <Stack direction="row" spacing={2}>
                <Avatar src={userStore.userFromFireBase.photoURL} />
                {/* alt={userStore.userFromFireBase.displayName} sx={{ bgcolor: deepOrange[500] }} */}
              </Stack>
            </div>
          }
          <Button color="inherit" onClick={() => Allsystem()}>all system</Button>
          {userStore.user &&
            <>
              <Button color="inherit" onClick={() => logOut()}>log out</Button>
              <Button color="inherit" onClick={() => system()}>your system</Button>
            </>
          }
          {userStore.user === null &&
            <Button color="inherit" onClick={() => login()}>if you have a system or location login here</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default observer(OurAppBar)