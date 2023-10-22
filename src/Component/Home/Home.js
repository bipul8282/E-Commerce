import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import style from './Home.module.css';
import { useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Home() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.reducerCart);
  const favItem = useSelector((state) => state.reducerFav);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let url = 'https://fakestoreapi.com/products';
      if (filter && filter !== 'Category') {
        url += `/category/${filter}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setData(data.map((item) => ({ ...item, qty: 1, isAdd: false })));
    };
    fetchData();

    const fetchCategories = async () => {
      const response = await fetch(
        'https://fakestoreapi.com/products/categories'
      );
      const data = await response.json();
      setCategory(data);
    };
    fetchCategories();
  }, [filter]);

  const handleIncrease = (item) => {
    setData((prevData) =>
      prevData.map((el) =>
        el.id === item.id ? { ...el, qty: el.qty + 1 } : el
      )
    );
  };

  const handleDecrease = (item) => {
    setData((prevData) =>
      prevData.map((el) =>
        el.id === item.id
          ? { ...el, qty: el.qty > 0 ? el.qty - 1 : 0, isAdd: el.qty > 1 }
          : el
      )
    );
  };

  const handleAdd = (item) => {
    setData((prevData) =>
      prevData.map((el) => (el.id === item.id ? { ...el, isAdd: true } : el))
    );
  };


  const isAuthenticated = () => {
    const token = Cookies.get('token');
    return !!token; // Check if access token exists
  };

  if (!isAuthenticated()) {
    navigate('/login'); // Redirect to the login page or appropriate route
    return null; // Render nothing if not authenticated
  }
  return (
    <>
      <div className={style.Conainer}>
        <Navbar setSearch={setSearch} search={search} />
        <div className={style.main}>
          <div className={style.category}>
            <select onChange={(e) => setFilter(e.target.value)}>
              <option value="Category">Category</option>
              {category.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>
          <div className={style.cardContainer}>
            {data
              .filter((e) =>
                e.title.toUpperCase().includes(search.toUpperCase())
              )
              .map((e) => (
                <div
                  key={e.id}
                  className={style.card}
                  onClick={() => navigate(`/product/:${e.id}`)}
                >
                  <div className={style.img}>
                    <img
                      src={e.image}
                      height="150vh"
                      width="110vw"
                      alt={e.title}
                    />
                  </div>
                  <div className={style.description}>
                    <p className={style.title}>{e.title}</p>
                    <p className={style.price}>$ {e.price}</p>
                  </div>
                  <div className={style.btnContainer}>
                    {!cartItem.find((i) => i.id === e.id)?.qty ? (
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          dispatch({ type: 'ADD_CART', payload: e });
                          handleAdd(e);
                        }}
                        className={style.btn}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className={style.quantity}>
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            dispatch({ type: 'DELETE_CART', payload: e });
                            handleDecrease(e);
                          }}
                          className={style.btn}
                        >
                          {'➖'}
                        </button>
                        <p>{cartItem.find((i) => i.id === e.id).qty}</p>
                        <button
                          className={style.btn}
                          onClick={(event) => {
                            event.stopPropagation();
                            dispatch({ type: 'ADD_CART', payload: e });
                            handleIncrease(e);
                          }}
                        >
                          {'➕'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
