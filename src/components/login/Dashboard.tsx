import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../../style/Dashboard.css";
import { auth, db, logout } from "../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import userStore from "../../store/userStore";
import requestStore from "../../store/request";
import ManagerStore from "../../store/managerStore";
import systemStore from "../../store/systemStore";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    userStore.user=null
    ManagerStore.currentManager=""
    requestStore.currentRequestAddressesName=""
    systemStore.currentSystem=null

    fetchUserName();
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
        <Typography component="h1" variant="h5"  sx={{ mt: 3, mb: 2 }}>
          Logged in as  {name}
        </Typography>

        <Typography component="h1" variant="h5">
          {user?.email}
        </Typography>

        {/* <button className="dashboard__btn" onClick={logout}>
          Logout
         </button> */}
        <Button
          onClick={logout}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          log out
        </Button>
      </Box>
    </Container>
  );
}
export default Dashboard;