// @vendors
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
	Switch, BrowserRouter as Router,
	Route
} from 'react-router-dom';

// @Components
import AppReducer from './../reducers';
import Products from './../containers/products/Products';
import Home from './../components/home/Home';
import Clients from './../components/clients/Clients';
import Contact from './../containers/contact/Contact';
import Nav from './../components/nav/Nav';
import Error from './../components/error/Error';

// @styles
import styles from './../App.module.scss';

const store = createStore(AppReducer, applyMiddleware(thunk));

const App = () =>
	(
		<Provider store={store}>
			<Router>
				<main>
					<Nav />
					<section className={styles.Main__section}>
						<Switch>
							<Route exact path="/home" component={Home} />
							<Route exact path="/products" component={Products} />
							<Route exact path="/products/:category" component={Products} />
							<Route exact path="/clients" component={Clients} />
							<Route exact path="/contact" component={Contact} />
							<Route component={Error} />
						</Switch>
					</section>
				</main>
			</Router>
		</Provider>
	);

export default App;
