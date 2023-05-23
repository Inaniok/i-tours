import { Suspense, lazy, useEffect } from 'react';
import { NavLink, Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import Header from './components/header';
import Tours from './components/tours';
import clsx from 'clsx';

import './App.scss';
import { DARK } from 'constants';
import { LIGHT } from 'constants';
import ContactUs from 'components/contact-us/ContactUs';
import { selectTheme } from 'store/theme/selectors';
import { useDispatch, useSelector } from 'react-redux';
import Auth from 'components/auth/Auth';
import { useAuth } from 'hooks/useAuth';
import { refreshUser } from 'store/auth/operations';

const Support = lazy(() => import('components/support/Support'));

const App = () => {
	const theme = useSelector(selectTheme);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { isLoggedIn, isRefreshing, isRefreshingError } = useAuth();

	const routesName = [
		{
			path: '/tours',
			label: 'Tours',
		},
		{
			path: '/contact-us',
			label: 'Contact Us',
		},
		{
			path: '/support',
			label: 'Support',
		},
	];

	useEffect(() => {
		dispatch(refreshUser());
	}, [dispatch]);

	useEffect(() => {
		if (isRefreshingError) {
			console.log('work');
		}
	}, [isRefreshingError]);

	console.log(isRefreshing);

	return (
		<div
			className={clsx('app-container', {
				'dark-theme': theme === DARK,
				'light-theme': theme === LIGHT,
			})}>
			{isRefreshing && <div>loading</div>}
			<Routes>
				{isLoggedIn ? (
					<>
						<Route
							path='/'
							element={
								<>
									<Header />
									<nav>
										{routesName.map((el, index) => (
											<NavLink to={el.path} key={index}>
												{el.label}
											</NavLink>
										))}
									</nav>
									<Routes>
										<Route path='/' element={<Tours />} />
										<Route
											path='/support'
											element={
												<Suspense fallback={<div>Loading module</div>}>
													<Support />
												</Suspense>
											}
										/>
										<Route path='/contact-us' element={<ContactUs />} />
										<Route
											path='*'
											element={
												<div>
													<h4>Not found</h4>
													<button onClick={() => navigate(-1)}>Back</button>
												</div>
											}
										/>
									</Routes>
								</>
							}
						/>
						<Route path='*' element={<Navigate to='/' />} />
					</>
				) : (
					<>
						<Route path='/auth/*' element={<Auth />} />
					</>
				)}
			</Routes>
		</div>
	);
};

export default App;
