import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { User } from '../utils/user';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "@firebase/auth";
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
import swal from 'sweetalert';
import { useFormik } from "formik";
import * as Yup from "yup"
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase";
import "../style/Register.css";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [userFromDb, setUserFromDb] = useState<any>();
  const navigate = useNavigate();
  const register = async () => {
    if (!firstName) alert("Please enter firstName");
    const fullName = firstName + ' ' + lastName;
    await registerWithEmailAndPassword(fullName, email, password);
    // await addUserToDb(res);
  };

  const addUserToDb = async (uid: string) => {
    const userToDb = {
      "fireBaseUid": uid,
      "firstName": firstName,
      "lastName": lastName,
      "phone": phone,
      "email": email
    }
    try {
      const res = await axios.post(`http://localhost:3333/user/addUser`, userToDb);
      let tempList = await res.data;
      setUserFromDb(tempList);
    } catch (error) { console.log(error); }
  }

  useEffect(() => {
    if (loading) return;
    if (user) {
      addUserToDb(user.uid);
      navigate("/dashboard");
    }
  }, [user, loading]);
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
          register
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>

            <TextField
              sx={{ marginTop: 1 }}
              required
              fullWidth
              value={firstName}
              id="firstName"
              label="firstName"
              name="firstName"
              autoComplete="family-name"
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="firstName"
            />
            <TextField
              sx={{ marginTop: 1 }}
              required
              fullWidth
              id="lastName"
              label="lastName"
              name="lastName"
              autoComplete="family-name"
              onChange={(e) => setLastName(e.target.value)}
              placeholder="lastName"
              value={lastName}
            />
            <TextField
              sx={{ marginTop: 1 }}
              required
              fullWidth
              id="phone"
              label="phone"
              name="phone"
              autoComplete="phone"
              onChange={(e) => setPhone(e.target.value)}
              placeholder="phone"
              value={phone}
            />
            <TextField
              sx={{ marginTop: 1 }}
              required
              fullWidth
              id="email"
              label="email"
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail Address"
              value={email}
            />
            <TextField
              sx={{ marginTop: 1 }}
              required
              fullWidth
              type="password"
              id="password"
              label="password"
              name="password"
              autoComplete="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              value={password}
            />
            <Button
              onClick={register}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Button
              onClick={signInWithGoogle}
              fullWidth
              variant="contained"
           
            >
              Register with Google
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                
                Already have an account? <Link to="/">Login</Link> now.
               
              </Grid>
            </Grid>
           
          </Grid>
        </Box>
      </Box>

    </Container>
  );
}
export default Register;