import React, { Component } from 'react';
import ToursItem from '../tours-item';

import debounce from 'lodash.debounce';

import './Tours.scss';
import ToursForm from 'components/tours-form/ToursForm';

const toursArray = [
	{
		id: 1,
		name: 'Portugalia vibe 123',
		price: 3000,
		continent: 'Europe',
		// description: 'Best tour for discover Portugal',
	},
	{
		id: 2,
		name: 'The breath of Italy',
		price: 5000,
		continent: 'Europe',
		description: 'Best tour for discover Italia',
	},
	{
		id: 3,
		name: 'Spanish bullfight',
		price: 1000,
		continent: 'Europe',
		// description: 'A new experience from watching a bullfight',
	},
	{
		id: 4,
		name: 'Germany race',
		price: 15000,
		continent: 'Europe',
		description: 'A quick walk on the German autobahns',
	},
	{
		id: 5,
		name: 'Indian traditions',
		price: 10000,
		continent: 'Asia',
		description: 'Best tour for discover Asia',
	},
];

class Tours extends Component {
	state = {
		query: '',
		visibleModal: false,
		tours: toursArray,
	};

	handleChangeQuery = ({ target: { value: query } }) => {
		this.setState({ query });
	};

	handleToggleModal = () => {
		this.setState((state) => ({ visibleModal: !state.visibleModal }));
	};

	handleAddTours = (tour) => {
		this.setState((state) => ({
			tours: [...state.tours, tour],
		}));
	};

	render() {
		const { query, tours, visibleModal } = this.state;
		return (
			<>
				<ToursForm
					visible={visibleModal}
					onClose={this.handleToggleModal}
					onAddFunc={this.handleAddTours}
				/>
				<section className='tours-page'>
					<div className='tours-page__controlls'>
						<h1>Tours page</h1>
						<input
							type='text'
							placeholder='search by name...'
							onChange={debounce(this.handleChangeQuery, 1000)}
						/>
						<button onClick={this.handleToggleModal}>Open Modal</button>
					</div>

					<ul>
						{tours
							.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
							.map((tour) => (
								<ToursItem key={tour.id} {...tour} {...this.props} />
							))}
					</ul>
				</section>
			</>
		);
	}
}

export default Tours;
