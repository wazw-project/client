import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { User } from '../utils/user';
import axios from 'axios';
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
  const [res,setRes]  = useState<any>();
  const [userFromDb,setUserFromDb]  = useState<any>();
  const navigate = useNavigate();
  const register = async() => {
    if (!firstName) alert("Please enter firstName");
    const fullName = firstName+' '+lastName;
    await registerWithEmailAndPassword(fullName, email, password);
    await addUserToDb();
  };

  const addUserToDb=async()=>{
    const userToDb={
      "firstName":firstName,
      "lastName":lastName,
      "phone":phone,
      "email":email
    }    
    try {
      const res = await axios.post(`http://localhost:3333/user/addUser`,userToDb);
      let tempList = await res.data;
      setUserFromDb(tempList);
  } catch (error) { console.log(error); }
  }

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="firstName"
        />
        <input
          type="text"
          className="register__textBox"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="lastName"
        />
        <input
          type="text"
          className="register__textBox"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="phone"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="register__btn" onClick={register}>
          Register
        </button>
        <button
          className="register__btn register__google"
          onClick={signInWithGoogle}
        >
          Register with Google
        </button>
        <div>
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Register;