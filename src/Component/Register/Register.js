import React, { useEffect, useState } from 'react';
import style from './Register.module.css';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function Register() {
  const data = {
    userName: '',
    email: '',
    dob: '',
    password: '',
    cPassword: '',
  };
  const error = {
    userNameError: 'Invalid user name',
    emailError: 'Invalid email',
    passwordError: 'Invalid password',
    cPasswordError: 'Password did not match',
    isUserRegisterError: 'Already Register',
  };
  const [userData, setUserData] = useState(data);
  const [allUserData, setAllUserData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reducerData = useSelector((state) => state.registration);
  console.log(reducerData);
  useEffect(() => {
    let data = Cookies.get('allUserData');
    if (data) {
      setAllUserData(JSON.parse(data));
      // dispatch({ type: 'REGISTER', payload: JSON.parse(data) });
    }
  }, []);

  useEffect(() => {}, []);
  console.log('allUserData', allUserData);

  const handleSubmit = () => {
    const usernameRegex = /^[^\s]+$/;
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]{4,}@[a-zA-Z]+\.[a-zA-Z]+/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;

    const isUserRegister = allUserData.findIndex(
      (data) =>
        data.email === userData.email || data.userName === userData.userName
    );
    console.log(isUserRegister);

    if (!usernameRegex.test(userData.userName)) {
      setErrorMessage(error.userNameError);
    } else if (userData.password !== userData.cPassword) {
      setErrorMessage(error.cPasswordError);
    } else if (!emailRegex.test(userData.email)) {
      setErrorMessage(error.emailError);
    } else if (!passwordRegex.test(userData.password)) {
      setErrorMessage(error.passwordError);
    } else if (isUserRegister >= 0) {
      setErrorMessage(error.isUserRegisterError);
    } else {
      allUserData.push(userData);
      dispatch({ type: 'REGISTER', payload: userData });
      Cookies.set('allUserData', JSON.stringify(allUserData), { expires: 7 });
      setAllUserData(allUserData);
      setUserData(data);
      alert('Sign Up successfully');
      navigate('/login');
    }
  };

  useEffect(() => {
    setErrorMessage('');
  }, [userData]);
  return (
    <div className={style.container}>
      <div className={style.form}>
        <div className={style.right}>
          <h2>Welcome to E- Commerce</h2>
          <p className={style.today}>Register Today</p>
          <input
            type="text"
            placeholder="Username"
            value={userData.userName}
            onChange={(e) =>
              setUserData({ ...userData, userName: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          <input
            type="date"
            value={userData.dob}
            onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={userData.cPassword}
            onChange={(e) =>
              setUserData({ ...userData, cPassword: e.target.value })
            }
          />
          <p className={style.error}>{errorMessage}</p>
          <button onClick={handleSubmit}>Submit</button>
          <p className={style.registered}>
            Already Register <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
