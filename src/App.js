import { Component } from 'react';
import Header from './components/header';
import Tours from './components/tours';

import { DARK, LIGHT } from 'constants';

import './App.scss';

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
			<div className='app-container'>
				<Header theme={theme} onToggle={this.handleToggleTheme}></Header>
				<Tours></Tours>
			</div>
		);
	}
}

export default App;
