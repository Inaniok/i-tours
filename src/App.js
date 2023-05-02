import { NavLink, Route, Routes } from 'react-router-dom';
import { ThemeComponent, useTheme } from 'hooks/useThemeContext';

import Header from './components/header';
import Tours from './components/tours';
import clsx from 'clsx';

import './App.scss';
import { DARK } from 'constants';
import { LIGHT } from 'constants';
import Support from 'components/support/Support';
import ContactUs from 'components/contact-us/ContactUs';
import ToursDetails from 'components/tours-details/ToursDetails';

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

				<Routes>
					<Route path='/tours' element={<Tours />}>
						<Route path=':tourId' element={<ToursDetails />} />
					</Route>

					<Route path='/support' element={<Support />} />
					<Route path='/contact-us' element={<ContactUs />} />
					<Route path='*' element={<div>Not found</div>} />
				</Routes>
			</div>
		</ThemeComponent>
	);
};

export default App;
