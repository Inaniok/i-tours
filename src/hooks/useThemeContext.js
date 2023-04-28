import { LIGHT } from 'constants';
import { DARK } from 'constants';
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(DARK);

const useTheme = () => useContext(ThemeContext);

const ThemeComponent = ({ children }) => {
	const [theme, setTheme] = useState(LIGHT);

	const onToggle = () => {
		setTheme((prevTheme) => (prevTheme === DARK ? LIGHT : DARK));
	};

	return <ThemeContext.Provider value={{ theme, onToggle }}>{children}</ThemeContext.Provider>;
};

export { useTheme, ThemeComponent };
