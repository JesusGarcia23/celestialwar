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
      <Route exact path='/' render={(props) => <LandingPage  {...props} />}/>
      <Route exact path='/lobby' component={Lobby}/>
      <Route exact path='/battlefield' render={(props) => <Battlefield {...props} />}/>
      <Route exact path='/test' component={Battlefield}/>
      <PrivateRoute exact path='/test2' component={Lobby}/>
      </Switch>
    </div>
  );
}

export default App;
