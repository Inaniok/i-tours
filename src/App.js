import { Suspense, lazy } from 'react';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeComponent, useTheme } from 'hooks/useThemeContext';

import Header from './components/header';
import Tours from './components/tours';
import clsx from 'clsx';

import './App.scss';
import { DARK } from 'constants';
import { LIGHT } from 'constants';
import ContactUs from 'components/contact-us/ContactUs';

const Support = lazy(() => import('components/support/Support'));

const App = () => {
	const { theme } = useTheme();

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
		<ThemeComponent>
			<div
				className={clsx('app-container', {
					'dark-theme': theme === DARK,
					'light-theme': theme === LIGHT,
				})}>
				<Header></Header>

				<nav>
					{routesName.map((el, index) => (
						<NavLink to={el.path} key={index}>
							{el.label}
						</NavLink>
					))}
				</nav>

				{true && (
					<Suspense fallback={<div>Loading module</div>}>
						<Support />
					</Suspense>
				)}

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
		</ThemeComponent>
	);
};

export default App;
