import logo from './logo.svg';
import './App.css';
import { useContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AuthContext } from './store/FirebaseContext';
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import ViewPost from './Pages/ViewPost'
import { Route, Router, Routes } from 'react-router-dom';
import Post from './store/PostContext';


function App() {
  const {user, setUser} = useContext(AuthContext)
  
  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        const uid = user.uid;
        
      } else {
        // User is signed out
        // ...
        console.log('User is signed out')
      }
    });
  })
  
  return (
    <div>
  <Post>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/create" element={<Create/>} />
      <Route path="/details" element={<ViewPost/>} />
    </Routes>
  </Post>
    </div>
  );
}

export default App;
