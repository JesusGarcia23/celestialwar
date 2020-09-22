import React, { useState } from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import Battlefield from './components/Battlefield';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import LandingPage from './pages/LandingPage';
import Room from './pages/Room';
import Lobby from './pages/Lobby';
import ServerDown from './pages/ServerDown';


function App() {
  
  return (
    <div className="App">
      <Switch>
        <PublicRoute exact path='/' component={LandingPage} />
        <PrivateRoute exact path='/lobby' component={Lobby}/>
        <PrivateRoute exact path='/battlefield' component={Battlefield}/>
        <Route exact path='/test' component={Battlefield}/>
        <PrivateRoute exact path='/room/:id' component={Room}/>
        <Route exact path='/error500' component={ServerDown}/>
      </Switch>
    </div>
  );
}

export default App;
