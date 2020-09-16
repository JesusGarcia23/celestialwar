import React, { useState } from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import Battlefield from './components/Battlefield';
import LandingPage from './pages/LandingPage';
import Lobby from './pages/Lobby';

function App() {
  
  return (
    <div className="App">
      <Switch>
      <Route exact path='/' render={(props) => <LandingPage  {...props} />}/>
      <Route exact path='/lobby' component={Lobby}/>
      <Route exact path='/battlefield' render={(props) => <Battlefield {...props} />}/>
      <Route exact path='/test' component={Battlefield}/>
      </Switch>
    </div>
  );
}

export default App;
