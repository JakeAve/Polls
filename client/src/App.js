import './App.scss';
import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SocketProvider } from './contexts/socketContext';

import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';

import Home from './views/Home/Home';
import New from './views/New/New';
import Poll from './views/Poll/Poll';

const App = () => {
  return (
    <>
      <Header />
      <Router>
        <Nav />
        <SocketProvider>
          <Switch>
            <Route path="/new" component={New} exact />
            <Route path="/polls/:pollId" component={Poll} />
            <Route path="/" component={Home} />
          </Switch>
        </SocketProvider>
      </Router>
    </>
  );
};

export default App;
