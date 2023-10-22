import React, { useState, useEffect } from 'react';
import style from './Login.module.css';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function Login() {
  const data = {
    userName: '',
    password: '',
  };

  const [check, setCheck] = useState(false);
  const [allUserData, setAllUserData] = useState([]);
  const [userData, setUserData] = useState(data);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const registerUserData = useSelector((state) => state.registration);
  console.log('data', registerUserData);
  useEffect(() => {
    let data = Cookies.get('allUserData');
    let user = Cookies.get('user');
    if (data) {
      setAllUserData(JSON.parse(data));
    }
    if (user) {
      setUserData(JSON.parse(user));
    }
  }, []);

  console.log(allUserData, 'heyyy');

  const handleLogin = () => {
    let registeredUser = registerUserData.find(
      (user) => user.userName === userData.userName
    );
    let dataa = Cookies.get('allUserData');
    dataa = JSON.parse(dataa);
    if (!registeredUser) {
      registeredUser = dataa.find(
        (user) => user.userName === userData.userName
      );
    }
    if (registeredUser && registeredUser.password !== userData.password) {
      setError('Wrong Password');
    } else if (!registeredUser) {
      alert('You are not Register');
    } else {
      alert('Login Successfully');
      Cookies.set('token', userData.userName);
      navigate('/home');
    }

    if (check && registeredUser) {
      Cookies.set('user', JSON.stringify(userData));
    } else {
      Cookies.set('user', JSON.stringify(data));
    }
    console.log(registeredUser, 'find');
  };

  useEffect(() => {
    setError('');
  }, [userData]);

  const handleCheck = () => {
    setCheck(!check);
  };

  return (
    <div className={style.container}>
      <div className={style.form}>
        <div className={style.right}>
          <h2>Welcome To E-Commerce</h2>
          <p className={style.today}>Login</p>
          <input
            type="text"
            placeholder="Username"
            value={userData.userName}
            onChange={(e) =>
              setUserData({ ...userData, userName: e.target.value })
            }
            className={style.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            className={style.input}
          />
          <label className={style.remember}>
            <input type="checkbox" checked={check} onChange={handleCheck} />
            Remember Me
          </label>
          <p className={style.error}>{error}</p>
          <button onClick={handleLogin}>Login</button>
          <p className={style.registered}>
            New User?  <Link to="/">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
