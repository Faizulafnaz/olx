import React, { useState, useContext } from 'react';
import { FirebaseContext, } from '../../store/FirebaseContext';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

export default function Signup() {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  const {firebase} = useContext(FirebaseContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    const auth = getAuth(); 
    createUserWithEmailAndPassword(auth, email, password).then((result) => {
      updateProfile( result.user, {displayName:username}).then(() => {
        addDoc(collection(getFirestore(),"users"), {
          id : result.user.uid,
          username : username,
          phone : phoneNo,
        }).then(() => {
          navigate('/login')
        })
      })
    })
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="phoneno"
            value={phoneNo}
            onChange={(e)=>setPhoneNo(e.target.value)}
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
