import {Navigate, useRoutes } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Route ,Routes} from 'react-router-dom';
// layouts
import React, { useState } from "react";

import LoginForm from './pages/login';
import AddMessageFiles from './pages/addMessageFiles';
import Dashboard from './pages/Dashboard';

import useToken from "./userToken";
import SignUp from './pages/signup';

// ----------------------------------------------------------------------
export default function AppRoutes() {

  const { token, setToken } = useToken();
  const [permissions, setPermisssions] = useState([]);

  const setUserPermission = (perm) => {
    setPermisssions(perm);
  };

    return (
      <>
          <Router>
            <Routes>
            <Route path="/" element={ <LoginForm
                  setUserPermission={setUserPermission}
                  setToken={setToken}
            /> } />
            <Route path="/add" element={ <AddMessageFiles/> } />
            <Route path="/dashboard" element={ <Dashboard/> } />
            <Route path="/signup" element={ <SignUp/> } />

            </Routes>
          </Router>
          
      </>
    );
  }
