import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { AiFillStar } from 'react-icons/ai';
import style from './Product.module.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function Product() {
  const [product, setProduct] = useState({});
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://fakestoreapi.com/products/${params.id.slice(1)}`
      );
      const data = await response.json();
      setProduct(data);
    };
    fetchData();
  }, []);
  const isAuthenticated = () => {
    const token = Cookies.get('token');
    return !!token; // Check if access token exists
  };

  if (!isAuthenticated()) {
    navigate('/login'); // Redirect to the login page or appropriate route
    return null; // Render nothing if not authenticated
  }
  return (
    <div className={style.Container}>
      <Navbar />
      <div className={style.card}>
        <img src={product.image} height="400px" />
        <div className={style.info}>
          <h3>{product.title}</h3>
          <p className={style.rating}>
            {product.rating?.rate}
            <AiFillStar />
          </p>
          <p className={style.price}>${product.price} </p>
          <p className={style.desHeading}>Description</p>
          <p className={style.description}>{product.description}</p>
        </div>
      </div>
    </div>
  );
}
