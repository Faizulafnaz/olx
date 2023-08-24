import React, { useContext, useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { PostContext } from '../../store/PostContext';
import { useNavigate } from 'react-router-dom';


function Posts() {
  const [products, setProduct] = useState([])
  const {setPostDetails} = useContext(PostContext)
  const navigate = useNavigate()
  useEffect(()=>{
    getDocs(collection(getFirestore(), "product")).then((productDoc) => {
      const allpost = productDoc.docs.map((product) => {
        return {
          ...product.data(),
          id:product.id
        }
      })
       setProduct(allpost)
    },[])
    
  })
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {
            products.length == 0?
            <div class="loader"></div>
            :
            ''
          }
          { products.map((product) => {

           return <div
            className="card"
            onClick={() => {
              setPostDetails(product)
              navigate('/details')
            }}
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image"> 
              <img src={product.url} alt="" />
              
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price} </p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
          })
          
         }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
        { products.map((product) => {

            return <div
            className="card"
            onClick={() => {
              setPostDetails(product)
              navigate('/details')
            }}
            >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image"> 
              <img src={product.url} alt="" />
              
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price} </p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
            </div>
            })

            }          
          

        </div>
      </div>
    </div>
  );
}

export default Posts;
