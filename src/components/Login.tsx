import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../style/Login.css";
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { System } from '../utils/system';
import { observer } from 'mobx-react';
import swal from 'sweetalert';
import store from '../store';
const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, loading, error] = useAuthState(auth);
  const [userFromDb, setUserFromDb] = useState<any>();
  const navigate = useNavigate();
  const [emailV, setEmailV] = useState<string>("*@gmail.com");
  const [PasswordV, setPasswordV] = useState<string>("******");
  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      debugger;
      console.log(user)
      debugger
      loginFromDB(user.uid);
    };
  }, [user, loading]);

  const logIn = async () => {
    if (emailV === "" || !isValidEmail(emailV) || PasswordV === "" || PasswordV.length <= 5) {
      swal("your form is not validate!!", "You clicked the button!", "error");
    }
    else {
      await logInWithEmailAndPassword(email, password);
    }
  }
  function isValidEmail(email: string) {
    debugger
    return /^[-!#$%&\'*+\\.\/0-9=?A-Z^_`{|}~]+@([-0-9A-Z]+\.)+([0-9A-Z]){2,4}$/i.test(email);
}
  const loginFromDB = async (Uid: any) => {
    try {
      debugger;
      await store.getUser(Uid);  
      if(store.user._id===""){
       await addUserToDb(Uid)
       await store.getUser(Uid);        
      }     
      navigate("/systems")
    } catch (error) { console.log(error); }
  }
  const addUserToDb = async (uid: string) => {
    debugger;
    debugger;
    const userToDb:any = {
      "fireBaseUid":uid,
      "firstName": "",
     "lastName": "",
       "phone":"",
      "email": ""
    }
  
    try {
      debugger;
     const res= await store.addUser(userToDb);        
      setUserFromDb(res);
    } catch (error) { console.log(error); }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'blue' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          login
        </Typography>

        <Box component="form" noValidate sx={{ mt: 1 }}>


          <TextField


            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail Address"
            placeholder="E-mail Address"
            name="email"
            autoComplete="email"
            autoFocus
            type="text"
            onChange={(e) => (setEmail(e.target.value), setEmailV(e.target.value))}
            onBlur={(e) => setEmailV(e.target.value)}
            helperText={emailV === "" ? "required!" : isValidEmail(emailV) ? "" : "not valid email"}
            error={(emailV === "" || !isValidEmail(emailV))}
          />

          <TextField
            onChange={(e) => (setPassword(e.target.value), setPasswordV(e.target.value))}
            onBlur={(e) => setPasswordV(e.target.value)}
            margin="normal"
            required
            fullWidth
            name="password"
            label="password"
            type="password"
            id="password"
            placeholder="Password"
            helperText={PasswordV === "" ? "required!" : PasswordV.length <= 5 ? "At least 6 characters" : ""}
            error={PasswordV === "" || PasswordV.length <= 5}
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            onClick={() => logIn()}
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>

          <Button
            fullWidth
            variant="contained"
            onClick={signInWithGoogle}

          >
            Login with Google
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/reset">Forgot Password</Link>
            </Grid>
            <Grid item>
              <Link to="/register">   Don't have an account? Sign Up</Link>

            </Grid>
          </Grid>


        </Box>
      </Box>
    </Container>
  );
}
export default Login;