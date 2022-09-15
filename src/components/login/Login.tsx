import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../../style/Login.css";
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
import swal from 'sweetalert';
import userStore from '../../store/userStore';
import mapStore from '../../store/mapStore';
import ManagerStore from "../../store/managerStore";
import systemStore from "../../store/systemStore";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, loading, error] = useAuthState(auth);
  const [userFromDb, setUserFromDb] = useState<any>();
  const navigate = useNavigate();
  const [emailV, setEmailV] = useState<string>("*@gmail.com");
  const [PasswordV, setPasswordV] = useState<string>("******");

  useEffect(() => {
    debugger
    if (loading) {
      return;
    }
    if (user) {
      loginFromDB(user.uid);
      userStore.userFromFireBase=user;
      getIdToken();
    };
  }, [user, loading]);

  const getIdToken=async()=>{
    await user?.getIdToken().then((value=>{
      debugger
      console.log(value);   
      userStore.token=value;
    }));
    console.log(userStore.token);
  }

  const logIn = async () => {
    debugger
    if (emailV === "" || !isValidEmail(emailV) || PasswordV === "" || PasswordV.length <= 5) {
      swal("your form is not validate!!", "You clicked the button!", "error");
    }
    else {
      debugger
      await logInWithEmailAndPassword(email, password);
    }
  }
  function isValidEmail(email: string) {
    
    return /^[-!#$%&\'*+\\.\/0-9=?A-Z^_`{|}~]+@([-0-9A-Z]+\.)+([0-9A-Z]){2,4}$/i.test(email);
}
  const loginFromDB = async (Uid: any) => {
    debugger
    try {
      debugger
      const userrr= await userStore.getUser(Uid);  
      console.log(userrr)
      debugger
      if(!userrr){
        debugger
        await addUserToDb(Uid)   
      }  
      debugger
      userStore.user=await userStore.getUser(Uid);
      debugger
      if(mapStore.dialogFromMail==true){
        debugger
        console.log(userStore.user._id);
        console.log(systemStore.currentSystem._id);
        ManagerStore.getManagersByUserIdAndSystemId(userStore.user._id,systemStore.currentSystem._id);
      }
      mapStore.dialogFromMail=false;    
      navigate(userStore.loginFrom)
    } catch (error) { console.log(error); }
  }
  const addUserToDb = async (uid: string) => {
    const userToDb: any = {
      "fireBaseUid": uid,
      "firstName": "",
      "lastName": "",
      "phone": "",
      "email": ""
    }

    try {
      debugger
     const res= await userStore.addUser(userToDb);     
     console.log(res)   
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
        <Avatar sx={{ m: 1, bgcolor: '#b2ebf2' }}>
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