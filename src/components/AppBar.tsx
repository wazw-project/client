import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const OurAppBar = () => {
    //  const navigate = useNavigate();
    // const logOut = () => {
    //     navigate('/Dashboard')
    // }
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
            News
          </Typography>
          {/* <Button onClick={() => logOut()}>log out</Button> */}
          {/* <Button onClick={() => navigate('/login')} color="inherit">Login</Button>
           <button onClick={() => logOut()}>log out</button>
          <Button onClick={() => navigate('/Dashboard')} color="inherit">Log out</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default OurAppBar