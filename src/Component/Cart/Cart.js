import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import style from './Cart.module.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const cartItem = useSelector((state) => state.reducerCart);
  const [item, setItem] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setItem(cartItem);
  }, [cartItem]);

  function handleCheckout(){
    Swal.fire('Order Placed!', 'Successfully!', 'success');
  }

  const isAuthenticated = () => {
    const token = Cookies.get('token');
    return !!token; // Check if access token exists
  };

  if (!isAuthenticated()) {
    navigate('/login'); // Redirect to the login page or appropriate route
    return null; // Render nothing if not authenticated
  }
  
  console.log('cartItem', cartItem);
  return (
    <>
      <Navbar />
      <div className={style.main}>
        <table>
          <th>Image</th>
          <th>Name</th>
          <th>Rate</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Delete</th>
          {item.map((el) => {
            return (
              <tr>
                <td>
                  <img width="50px" src={el.image} />
                </td>
                <td>{el.title}</td>
                <td>${el.price}</td>
                <td>
                  <div className={style.quantity}>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        dispatch({ type: 'DELETE_CART', payload: el });
                      }}
                    >
                      {'➖'}
                    </button>
                    <p>{el.qty}</p>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        dispatch({ type: 'ADD_CART', payload: el });
                      }}
                    >
                      {'➕'}
                    </button>
                  </div>
                </td>
                <td>${(+el.price * +el.qty).toFixed(2)}</td>
                <td
                  onClick={() =>
                    dispatch({ type: 'ITEM_REMOVE_CART', payload: el })
                  }
                >
                  {'⛔'}
                </td>
              </tr>
            );
          })}
          <p className={style.amount}>
            TOTAL AMOUNT : ${' '}
            {item
              .reduce((total, el) => total + el.price * el.qty, 0)
              .toFixed(2)}
          </p>
        </table>
        <button onClick={handleCheckout} className={style.btn}>Place Order</button>
      </div>
    </>
  );
}
