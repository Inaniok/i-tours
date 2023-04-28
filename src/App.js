import { ThemeComponent, useTheme } from 'hooks/useThemeContext';

import Header from './components/header';
import Tours from './components/tours';
import clsx from 'clsx';

import './App.scss';
import { DARK } from 'constants';
import { LIGHT } from 'constants';

const App = () => {
	const { theme } = useTheme();

	return (
		<ThemeComponent>
			<div
				className={clsx('app-container', {
					'dark-theme': theme === DARK,
					'light-theme': theme === LIGHT,
				})}>
				<Header></Header>
				<Tours />
			</div>
		</ThemeComponent>
	);
};

export default App;
