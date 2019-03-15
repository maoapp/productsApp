// @vendors
import React from 'react';
import { CircularProgress } from 'react-md';
// @styles
import styles from './Home.module.scss';

const Home = () => (
	<div className={styles['homeContainer']}>
		<h1>
            Home
            <CircularProgress />
		</h1>
	</div>
);

export default Home;
