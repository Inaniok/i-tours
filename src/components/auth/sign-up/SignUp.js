import React from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from 'store/auth/operations';

const SignUp = () => {
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = e.currentTarget;
		dispatch(
			signUp({
				name: form.elements.name.value,
				email: form.elements.email.value,
				password: form.elements.password.value,
			})
		);
		form.reset();
	};

	return (
		<div className='auth-container'>
			<h4>Welcome to my app</h4>
			<form className='auth-form' autoComplete='off' onSubmit={handleSubmit}>
				<div>
					<label className='auth-label'>Full name</label>
					<input className='auth-input' type='text' name='name' />
				</div>
				<div>
					<label className='auth-label'>Email</label>
					<input className='auth-input' type='email' name='email' />
				</div>
				<div>
					<label className='auth-label'>Password</label>
					<input className='auth-input' type='password' name='password' />
				</div>
				<button type='submit'>Sign up</button>
			</form>
		</div>
	);
};

export default SignUp;
