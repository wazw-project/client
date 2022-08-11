import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../style/Login.css";
import { Auth } from "@firebase/auth";
import axios from "axios";

const Login: React.FC=()=> {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, loading, error] = useAuthState(auth);
  const [userFromDb,setUserFromDb]  = useState<any>();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user){
      loginFromDB(user.uid);
      navigate("/systems")
    } ;
  }, [user, loading]);

  const logIn=async()=>{
    await logInWithEmailAndPassword(email, password);
  }

  const loginFromDB=async(Uid:any)=>{  
    try {
      const res = await axios.get(`http://localhost:3333/user/${Uid}`);
      let tempList = await res.data;
      setUserFromDb(tempList);
  } catch (error) { console.log(error); }
  }

  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => logIn()}
          // onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Login;