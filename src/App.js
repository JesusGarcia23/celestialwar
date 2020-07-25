import React from 'react';
import {Switch, Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Canvas from './components/Canvas/Canvas';

function App() {
  return (
    <div className="App">
      <Switch>
      <Route exact path='/test' component={Canvas}/>
      </Switch>
    </div>
  );
}

export default App;
