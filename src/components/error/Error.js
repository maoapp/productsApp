// @vendors
import React from 'react';

// @constants
import { ERROR_404 } from './../../constants/constants';

// @styles
import styles from './Error.module.scss';

const Error = () => (
	<div className={styles['error__container']}>
		<h1>ERROR {ERROR_404}</h1>
	</div>
);

export default Error;
