// @vendors
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button } from 'react-md';

// @constants
import { 
	INPUT_ID_REACT_MD,
	MAX_LENGTH_INPUT_DEFAULT, 
	MAX_LENGTH_SUBJECT_FIELD, 
	VALIDATION_MESSAGE_INPUT_DEFAULT ,
	VALIDATION_MESSAGE_INPUT_EMAIL,
	VALIDATION_MESSAGE_INPUT_SUBJECT
} from '../../constants/constants';

// @styles
import styles from './Contact.module.scss';

class Contact extends Component {
	constructor() {
		super();

		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			subject: '',
			dataAvailable: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleValidation = this.handleValidation.bind(this);
		this.renderForm = this.renderForm.bind(this);
	}

	handleChange(value, key) {
		this.setState({
			[key]: value
		}, () => this.handleValidation());
	}
    
	handleSubmit(){
		const {
			firstName,
			lastName,
			email,
			subject
		} = this.state;
        
		this.props.postContactData({ firstName, lastName, email, subject });
	}
    
	handleValidation() {
		const {
			firstName,
			lastName,
			email,
			subject
		} = this.state;
        
		if(firstName && lastName && email && subject) {
			this.setState({
				dataAvailable: true
			});
		} else {
			this.setState({
				dataAvailable: false
			});
		}
	}
    
	renderForm() {
		const { 
			dataAvailable,
			email,
			firstName,
			lastName,
			subject 
		} = this.state;
        
		return (
			<form
				id="contactForm"
				className={styles['form']}
			>
				<div className={styles['formContainer']}>
					<TextField
						className="md-cell--center md-cell--12"
						errorText={`${VALIDATION_MESSAGE_INPUT_DEFAULT} first name`}
						id={INPUT_ID_REACT_MD}
						label="First Name"
						maxLength={MAX_LENGTH_INPUT_DEFAULT}
						name="firstName"
						onChange={(value) => this.handleChange(value, 'firstName')}
						placeholder="Your name..."
						required
						type="text"
						value={firstName}
					/>
					<TextField
						className="md-cell--center md-cell--12"
						errorText={`${VALIDATION_MESSAGE_INPUT_DEFAULT} last name`}
						id={INPUT_ID_REACT_MD}
						label="Last Name"
						maxLength={MAX_LENGTH_INPUT_DEFAULT}
						name="lastName"
						onChange={(value) => this.handleChange(value, 'lastName')}
						placeholder="Your lastname.."
						required
						type="text"
						value={lastName}
					/>
					<TextField
						className="md-cell--center md-cell--12"
						errorText={VALIDATION_MESSAGE_INPUT_EMAIL}
						id={INPUT_ID_REACT_MD}
						label="Email"
						maxLength={MAX_LENGTH_INPUT_DEFAULT}
						name="email"
						onChange={(value) => this.handleChange(value, 'email')}
						placeholder="Your email.."
						required
						type="email"
                        value={email}
					/>
					<TextField
						className="md-cell--center md-cell--12"
						errorText={VALIDATION_MESSAGE_INPUT_SUBJECT}
						id={INPUT_ID_REACT_MD}
						label="Subject"
						maxLength={MAX_LENGTH_SUBJECT_FIELD}
						name="subject"
						onChange={(value) => this.handleChange(value, 'subject')}
						placeholder="Let us know your concerns!"
						required
						rows={6}
						type="text"
						value={subject}
					/>
					<Button
						className={styles['form__button']}
						disabled={!dataAvailable}
						onClick={() => this.handleSubmit()}
						primary 
						raised
					>
                        Submit
					</Button>
				</div>
			</form>
		);
	}

	render() {
		
		return this.renderForm();
	}
}

Contact.propTypes = {
	postContactData: PropTypes.func
};

export default Contact;
