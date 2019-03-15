// @vendors
import React from 'react';
import PropTypes from 'prop-types';

// @styles
import styles from './EmptyState.module.scss';

const EmptyState = ({state, customMessage}) => (
	<div className={styles['emptyState']}>
		<h1 className={styles['emptyState__state']}>{state}</h1>
		<p className={styles['emptyState__message']}>{customMessage}</p>
	</div>
);

EmptyState.propTypes = { 
	state: PropTypes.string,
	customMessage: PropTypes.string.isRequired
};

EmptyState.defaultProps = {
	state: ''
};

export default EmptyState;
