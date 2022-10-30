import {Navigate, useRoutes } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Route ,Routes} from 'react-router-dom';
// layouts

import LoginForm from './pages/login';
import AddMessageFiles from './pages/addMessageFiles';

// ----------------------------------------------------------------------
export default function AppRoutes() {
    return (
      <>
          <Router>
            <Routes>
            <Route path="/" element={ <LoginForm/> } />
            <Route path="/add" element={ <AddMessageFiles/> } />
            </Routes>
          </Router>
          
      </>
    );
  }
