import React, {useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/layout/Header';
import Home from './components/pages/Home';
import SingleCar from './components/pages/SingleCar';
import SingleUser from './components/pages/SingleUser';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import SignIn from './components/auth/SignIn';
import UserContext from './context/userContext';
import './App.css';
import Dashboard from './components/pages/Dashboard';
import Add from './components/auth/Add';

function App() {
  const [ userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if(token === null){
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await axios.post('http://localhost:8000/api/auth/tokenIsValid', null, {headers: {"x-auth-token": token}});
      if (tokenResponse.data.data) {
        const userRes = await axios.get("http://localhost:8000/api/auth/users", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    }

    checkLoggedIn();
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/admin/login" component={SignIn} />
          <Route path="/car/:id" component={SingleCar} />
          <Route path="/user/one/:id" component={SingleUser} />
          <Route path="/add" component={Add} />


        </Switch>
        </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
