import React from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from 'store/auth/operations';

const SignIn = () => {
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = e.currentTarget;
		dispatch(
			logIn({
				email: form.elements.email.value,
				password: form.elements.password.value,
			})
		);
		form.reset();
	};

	return (
		<div className='auth-container'>
			<h4>Log in to system</h4>
			<form className='auth-form' autoComplete='off' onSubmit={handleSubmit}>
				<div>
					<label className='auth-label'>Email</label>
					<input className='auth-input' type='email' name='email' />
				</div>
				<div>
					<label className='auth-label'>Password</label>
					<input className='auth-input' type='password' name='password' />
				</div>
				<button type='submit'>Log In</button>
			</form>
		</div>
	);
};

export default SignIn;
