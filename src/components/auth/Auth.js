import { Navigate, Route, Routes } from 'react-router-dom';
import SignIn from './sign-in/SignIn';
import SignUp from './sign-up/SignUp';
import './style.scss';

const Auth = () => {
	return (
		<div className='auth'>
			<p>Logo</p>
			<Routes>
				<Route path='sign-in' element={<SignIn />} />
				<Route path='sign-up' element={<SignUp />} />
				<Route path='*' element={<Navigate to='/auth/sign-in' />} />
			</Routes>
		</div>
	);
};

export default Auth;
