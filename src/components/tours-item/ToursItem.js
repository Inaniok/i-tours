import PropTypes from 'prop-types';

import './ToursItem.css';
import clsx from 'clsx';
import { LIGHT, DARK } from 'constants';

const ToursItem = ({ name, price, continent, description, theme }) => {
	return (
		<li
			className={clsx('tours-item', {
				'dark-theme': theme === LIGHT,
				'light-theme': theme === DARK,
			})}>
			<p>Name:{name}</p>
			<p>Price:{price}</p>
			<p>Continent{continent}:</p>
			{description && <p>Description:{description}</p>}
		</li>
	);
};

export default ToursItem;

ToursItem.propTypes = {
	name: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	continent: PropTypes.string.isRequired,
	description: PropTypes.string,
};
