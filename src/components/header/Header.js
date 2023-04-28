import { ReactComponent as LogoIcon } from 'assets/image/logo.svg';
import { useTheme } from 'hooks/useThemeContext';
import './Header.css';

const Header = () => {
	const { theme, onToggle } = useTheme();

	return (
		<header>
			<LogoIcon id='logo' />
			<button onClick={onToggle}>Theme:{theme}</button>
		</header>
	);
};

export default Header;
