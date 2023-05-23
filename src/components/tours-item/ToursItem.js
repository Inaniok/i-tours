import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import clsx from 'clsx';

import { selectTheme } from 'store/theme/selectors';
import { LIGHT, DARK } from 'constants';

import ToursDetails from 'components/tours-details/ToursDetails';

import './ToursItem.css';

const ToursItem = ({ id, name, price, continent, description, onDelete }) => {
	const theme = useSelector(selectTheme);

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
