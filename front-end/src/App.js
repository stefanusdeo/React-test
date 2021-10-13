import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import MainHeader from './Components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const valuelocalstorage = localStorage.getItem('isLoggedin');
    if (valuelocalstorage === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedin', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedin');
    setIsLoggedIn(false);
  };
  const registerHandler = async (name, email, password) => {
    const newUser = {
      name,
      email,
      password,
    };

    try {
      const config = {
        headers: {
          'Content-Type': 'Application/json',
        },
      };
      const body = JSON.stringify(newUser);

      const res = await axios.post(
        'http://localhost:5000/api/users',
        body,
        config
      );
      console.log(res);
    } catch (err) {
      alert('User already exist');
      console.error(err.response.data);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
      }}
    >
      <MainHeader onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {!isLoggedIn && <Register onRegister={registerHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
