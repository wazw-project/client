import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../firebase";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import "../style/Reset.css";
import { Button } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
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
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
          fullWidth
          value={email}
          name="email"
          label="email"
          type="email"
          id="email"
          placeholder="E-mail Address"
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