import './App.scss';
import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SocketProvider } from './contexts/socketContext';

import Home from './views/Home/Home';

const App = () => {
  return (
    <Router>
      <SocketProvider>
        <Switch>
          <Route path="/">
            <Home />
            <h1>Hello World</h1>
            <button>Hello Button</button>
            <button className="accent">Hello Button</button>
            <input />
            <input className="fore" />
            <a href="/">A Link</a>
            <a href="/">A Home Link</a>
          </Route>
        </Switch>
      </SocketProvider>
    </Router>
  );
};

export default App;
