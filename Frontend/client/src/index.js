import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App";
import {BrowserRouter,Router} from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SignOut from './components/SignOut';

ReactDOM.render(
  <React.StrictMode>

  <BrowserRouter>

    <App>
        <Router   path="/" component={Home} />
        <Router   path="/signin" component={SignIn} />
        <Router   path="/signup" component={SignUp} />
        <Router   path="/signout" component={SignOut} />
    </App>
  </BrowserRouter>
   
  </React.StrictMode>,
  document.getElementById('root')
);

