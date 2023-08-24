import React, { useContext, useEffect, useState } from 'react';
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";

import './View.css';
import { PostContext } from '../../store/PostContext';

function View() {
  const [userDetails, setUserDetails] = useState()
  const {postDetails} = useContext(PostContext)
  useEffect(() => {
    const {userId} = postDetails
    console.log('id', userId)
    const q = query(collection(getFirestore(), "users"), where("id", "==", userId));
    const querySnapshot  =  getDocs(q)
    console.log(querySnapshot)
    
    // if (!querySnapshot.empty) {
    //   const docData = querySnapshot.docs[0].data();
    //   setUserDetails(docData);
    //   console.log('User Details:', docData);
    // }

    // querySnapshot.forEach((doc) => {
    //   setUserDetails(doc.data());
    //   console.log('User Details:', doc.data());
    // });
   

  }, [postDetails])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url ? postDetails.url : ''}
          alt="product image"
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price}</p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>{userDetails && userDetails.username}</p>
          <p></p>
          <p>{ userDetails && userDetails.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
