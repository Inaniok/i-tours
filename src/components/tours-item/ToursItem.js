import PropTypes from 'prop-types';

import './ToursItem.css';
import clsx from 'clsx';
import { LIGHT, DARK } from 'constants';
import { useTheme } from 'hooks/useThemeContext';
import { Link, useLocation } from 'react-router-dom';
import ToursDetails from 'components/tours-details/ToursDetails';

const ToursItem = ({ id, name, price, continent, description, onDelete }) => {
	const { theme } = useTheme();
	const location = useLocation();

	return (
		<li
			className={clsx('tours-item', {
				'dark-theme': theme === LIGHT,
				'light-theme': theme === DARK,
			})}>
			<p>id:{id}</p>
			<p>Name:{name}</p>
			<p>Price:{price}</p>
			<p>Continent:{continent}</p>
			{description && <p>Description:{description}</p>}
			<button onClick={() => onDelete(id)}>Delete</button>
			<Link to={'/tours'} state={{ id }}>
				More
			</Link>

			{location.state?.id === id && <ToursDetails />}
		</li>
	);
};

export default ToursItem;

ToursItem.propTypes = {
	name: PropTypes.string.isRequired,
	// price: PropTypes.string.isRequired,
	continent: PropTypes.string.isRequired,
	description: PropTypes.string,
};
