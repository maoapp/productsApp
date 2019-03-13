import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Products from './containers/products/Products';
import Home from './components/home/Home';
import Clients from './components/clients/Clients';
import Contact from './components/contact/Contact';
import Nav from './components/nav/Nav';

import AppReducer from './reducers';
import styles from './App.modules.scss';

const store = createStore(AppReducer, applyMiddleware(thunk));

const App = () =>
  (
    <Provider store={store}>
      <Router>
        <main>
          <Nav />
          <section className={styles.Main__section}>
            <Route exact path="/" component={Home} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/products/:category" component={Products} />
            <Route exact path="/clients" component={Clients} />
            <Route exact path="/contacts" component={Contact} />
          </section>
        </main>
      </Router>
    </Provider>
  );


export default App;




    
