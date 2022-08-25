import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../../firebase";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import "../../style/Reset.css";
import { Button } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}
function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [emailV, setEmailV] = useState<string>("*@gmail.com");
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/systems");
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

        <TextField
         
          margin="normal"
          required
          fullWidth
          value={email}
          name="email"
          label="email"
          type="email"
          id="email"
          placeholder="E-mail Address"
          onBlur={(e) => setEmailV(e.target.value)}
          onChange={(e) => (setEmail(e.target.value),setEmailV(e.target.value))}
          helperText={emailV === "" ? "required!" : isValidEmail(emailV) ? "" : "not valid email"}
          error={(emailV === "" || !isValidEmail(emailV))}
        />


        <Button
          fullWidth
          variant="contained"
          onClick={() => sendPasswordReset(email)}
          sx={{ mt: 3, mb: 2 }}
        >
          Send password reset email
        </Button>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
        </Box>
    </Container>
       
  );
}
export default Reset;