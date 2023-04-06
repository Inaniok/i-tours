import { ReactComponent as LogoIcon } from 'assets/image/logo.svg';
import './Header.css';

const Header = (props) => {
	return (
		<header>
			<LogoIcon id='logo' />
			<button>Theme:{props.theme}</button>
		</header>
	);
};

export default Header;
