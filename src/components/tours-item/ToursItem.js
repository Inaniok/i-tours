import PropTypes from 'prop-types';

import './ToursItem.css';

const ToursItem = ({ name, price, continent, description, theme }) => {
	const _getTheme = (nameOfTheme) => {
		if (nameOfTheme === 'dark') {
			return {
				background: '#fff',
				color: '#000',
			};
		}
		return {
			background: '#000',
			color: '#fff',
		};
	};
	return (
		<li className='tours-item' style={_getTheme(theme)}>
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
