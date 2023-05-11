import { Suspense, lazy } from 'react';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';

import Header from './components/header';
import Tours from './components/tours';
import clsx from 'clsx';

import './App.scss';
import { DARK } from 'constants';
import { LIGHT } from 'constants';
import ContactUs from 'components/contact-us/ContactUs';
import { getTheme } from 'store/theme/selectors';
import { useSelector } from 'react-redux';

const Support = lazy(() => import('components/support/Support'));

const App = () => {
	const theme = useSelector(getTheme);

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

	return (
		<div
			className={clsx('app-container', {
				'dark-theme': theme === DARK,
				'light-theme': theme === LIGHT,
			})}>
			<Header />

			<nav>
				{routesName.map((el, index) => (
					<NavLink to={el.path} key={index}>
						{el.label}
					</NavLink>
				))}
			</nav>

			<Routes>
				<Route path='/tours' element={<Tours />} />
				<Route
					path='/support'
					element={
						<Suspense fallback={<div>Loading module</div>}>
							<Support />
						</Suspense>
					}
				/>
				<Route path='/contact-us' element={<ContactUs />} />
				<Route path='*' element={<Navigate to='/tours' />} />
			</Routes>
		</div>
	);
};

export default App;
