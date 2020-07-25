import React from 'react';
import {Switch, Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Battlefield from './components/Battlefield'

function App() {
  return (
    <div className="App">
      <Switch>
      <Route exact path='/battlefield' component={Battlefield}/>
      </Switch>
    </div>
  );
}

export default App;
