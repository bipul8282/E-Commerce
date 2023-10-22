import React from 'react';
import style from './Navbar.module.css';
import Cookies from 'js-cookie';
import {
  AiOutlinePoweroff,
  AiOutlineShoppingCart,
  AiOutlineHome,
} from 'react-icons/ai';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ search, setSearch }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove('token');
    Swal.fire('User Logged Out!', 'Successfully!', 'success');
    navigate('/login');
  };
  return (
    <div className={style.main}>
      <div className={style.navLeft}>
        <img src="https://imgur.com/Umqz6MI.png" alt="logo" width="40%" />
      </div>
      <div className={style.navRight}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
        />
        <p>
          <Link to="/home" className={style.link}>
            <AiOutlineHome />
          </Link>
        </p>
        <p>
          <Link to="/cart" className={style.link}>
            <AiOutlineShoppingCart />
          </Link>
        </p>
        <p>
          <div onClick={handleLogout} className={style.link}>
            <AiOutlinePoweroff color="red" />
          </div>
        </p>
      </div>
    </div>
  );
}
