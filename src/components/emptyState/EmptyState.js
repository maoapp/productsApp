// @vendors
import React from 'react';

// @styles
import styles from './EmptyState.module.scss';

const EmptyState = ({state, customMessage}) => (
	<div className={styles['emptyState']}>
		<h1 className={styles['emptyState__state']}>{state}</h1>
		<p className={styles['emptyState__message']}>{customMessage}</p>
	</div>
);

export default EmptyState;
