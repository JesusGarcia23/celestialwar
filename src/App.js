import React, { useState } from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import Battlefield from './components/Battlefield';
import LandingPage from './pages/LandingPage';
import Lobby from './pages/Lobby';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

function App() {
  
  return (
    <div className="App">
      <Switch>
        <PublicRoute exact path='/' component={LandingPage} />
        <PrivateRoute exact path='/lobby' component={Lobby}/>
        <PrivateRoute exact path='/battlefield' component={Battlefield}/>
        <Route exact path='/test' component={Battlefield}/>
      </Switch>
    </div>
  );
}

export default App;
