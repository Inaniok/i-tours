import { useDispatch, useSelector } from 'react-redux';

import { getTheme } from 'store/theme/selectors';
import { setTheme } from 'store/theme/actions';

import { DARK } from 'constants';
import { LIGHT } from 'constants';

import { ReactComponent as LogoIcon } from 'assets/image/logo.svg';

import './Header.css';

const Header = () => {
	const dispatch = useDispatch();
	const theme = useSelector(getTheme);

	const onToggle = () => {
		const value = theme === DARK ? LIGHT : DARK;
		dispatch(setTheme(value));
	};
	return (
		<header>
			<LogoIcon id='logo' />
			<button onClick={onToggle}>Theme:{theme}</button>
		</header>
	);
};

export default Header;
