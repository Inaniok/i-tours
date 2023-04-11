import { Component } from 'react';
import Header from './components/header';
import Tours from './components/tours';

import { DARK, LIGHT } from 'constants';

import './App.scss';
import clsx from 'clsx';

class App extends Component {
	state = {
		theme: DARK,
	};

	handleToggleTheme = () => {
		this.setState((state) => ({ theme: state.theme === DARK ? LIGHT : DARK }));
	};

	render() {
		const { theme } = this.state;
		return (
			<div
				className={clsx('app-container', {
					'dark-theme': theme === DARK,
					'light-theme': theme === LIGHT,
				})}>
				<Header theme={theme} onToggle={this.handleToggleTheme}></Header>
				<Tours theme={theme}></Tours>
			</div>
		);
	}
}

export default App;
