import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../style/Login.css";
import { Auth } from "@firebase/auth";
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormLabel, Alert } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup"


const validationSchema = Yup.object({
  email: Yup.string().email('not valid email').required('require'),
  password: Yup.string().required('require'),
})
const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, loading, error] = useAuthState(auth);
  const [userFromDb, setUserFromDb] = useState<any>();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      loginFromDB(user.uid);
    };
  }, [user, loading]);

  const logIn = async () => {
    await logInWithEmailAndPassword(email, password);
  }

  const loginFromDB = async (Uid: any) => {
    try {
      debugger;
      const res = await axios.get(`http://localhost:3333/user/${Uid}`);
      let tempList = await res.data;
      console.log(tempList)
      setUserFromDb(tempList);
      navigate("/systems", { state: { id: tempList._id } })

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
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            fullWidth
            name="password"
            label="password"
            type="password"
            id="password"
            placeholder="Password"
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
            onClick={ signInWithGoogle}
          
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