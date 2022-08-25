import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import swal from 'sweetalert';
import userStore from '../../store/userStore';

import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";
import "../../style/Register.css";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [emailV, setEmailV] = useState<string>("*@gmail.com");
  const [PasswordV, setPasswordV] = useState<string>("******");
  const [firstNameV,setFirstNameV]=useState<string>("**");
  const [lastNameV,setLastNameV]=useState<string>("**");
  const [phoneV,setPhoneV]=useState<string>("********");
  const navigate = useNavigate();

  const register = async () => {
    if(firstNameV === "" || firstNameV.length < 2||lastNameV === "" || lastNameV.length < 2||phoneV === "" || phoneV.length < 8||emailV === "" || !isValidEmail(emailV)||PasswordV === "" || PasswordV.length <= 5)
    {
      swal("your form is not validate!!", "You clicked the button!", "error");
    }
    else{
    if (!firstName) alert("Please enter firstName");
    const fullName = firstName + ' ' + lastName;
    await registerWithEmailAndPassword(fullName, email, password);
  }
  };

  const addUserToDb = async (uid: string) => {
    debugger;
    const userToDb:any= {
      "fireBaseUid": uid,
      "firstName": firstName,
      "lastName": lastName,
      "phone": phone,
      "email": email
    }
    try {
        await userStore.addUser(userToDb);         
    } catch (error) { console.log(error); }
  }

  useEffect(() => {
    if (loading) return;
    if (user) {
      addUserToDb(user.uid);
      navigate("/systems");
    }
  }, [user, loading]);
  function isValidEmail(email: string) {
    debugger
    return /^[-!#$%&\'*+\\.\/0-9=?A-Z^_`{|}~]+@([-0-9A-Z]+\.)+([0-9A-Z]){2,4}$/i.test(email);
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
              onChange={(e) => (setFirstName(e.target.value),setFirstNameV(e.target.value))}
              onBlur={(e) => setFirstNameV(e.target.value)}
              helperText={firstNameV === "" ? "required!"  :firstNameV.length < 2 ? "At least 2 characters":""}
              error={firstNameV === "" || firstNameV.length < 2}
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
              placeholder="lastName"
              value={lastName}
              onChange={(e) => (setLastName(e.target.value),setLastNameV(e.target.value))}
              onBlur={(e) => setLastNameV(e.target.value)}
              helperText={lastNameV === "" ? "required!"  :lastNameV.length<2 ? "At least 2 characters":""}
              error={lastNameV === "" || lastNameV.length < 2}
            />
            <TextField
              sx={{ marginTop: 1 }}
              required
              fullWidth
              id="phone"
              label="phone"
              name="phone"
              autoComplete="phone"    
              placeholder="phone"
              value={phone}
              onChange={(e) => (setPhone(e.target.value),setPhoneV(e.target.value))}
              onBlur={(e) => setPhoneV(e.target.value)}
              helperText={phoneV === "" ? "required!"  :phoneV.length < 8 ? "At least 8 characters":""}
              error={phoneV === "" || phoneV.length < 8}
            />
            <TextField
              sx={{ marginTop: 1 }}
              required
              fullWidth
              id="email"
              label="email"
              name="email"
              autoComplete="email"
              onChange={(e) => (setEmail(e.target.value), setEmailV(e.target.value))}
              onBlur={(e) => setEmailV(e.target.value)}
              helperText={emailV === "" ? "required!" : isValidEmail(emailV) ? "" : "not valid email"}
              error={(emailV === "" || !isValidEmail(emailV))}
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
              placeholder="Password"
              value={password}
              onChange={(e) => (setPassword(e.target.value), setPasswordV(e.target.value))}
              onBlur={(e) => setPasswordV(e.target.value)}
              helperText={PasswordV === "" ? "required!" : PasswordV.length <= 5 ? "At least 6 characters" : ""}
              error={PasswordV === "" || PasswordV.length <= 5}
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