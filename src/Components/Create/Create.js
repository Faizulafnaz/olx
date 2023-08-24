import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext } from '../../store/FirebaseContext';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable} from "firebase/storage";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';


const Create = () => {
  
  const {user, setUser} = useContext(AuthContext)
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const date = new Date()

  const handleSubmit = () => {
    const storage = getStorage()
    const storageRef = ref(storage, `/image/${image.name}`)
    const uploadTask = uploadBytesResumable(storageRef, image);
   
    uploadTask.then(({ref}) => {
      getDownloadURL(ref).then((url) => {
          addDoc(collection(getFirestore(),"product"), {
            name : name,
            category : category,
            price : price,
            url : url,
            userId : user.uid,
            createdAt : date.toDateString()
          }).then(() => {
            navigate('/')
          })
      })
    }) 
  }
  
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">

            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" value={price}
              onChange={(e)=>setPrice(e.target.value)}/>
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
         
            <br />
            <input type="file" 
              onChange={(e)=>setImage(e.target.files[0])}/>
            <br />
            <button onClick={handleSubmit}  className="uploadBtn">upload and Submit</button>
        
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
