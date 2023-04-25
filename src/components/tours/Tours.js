import React, { Component } from 'react';
import ToursItem from '../tours-item';

import debounce from 'lodash.debounce';

import './Tours.scss';
import ToursForm from 'components/tours-form/ToursForm';
import { addTour, deleteTourById, fetchTours } from 'api/tours';
import moment from 'moment';

class Tours extends Component {
	state = {
		query: '',
		visibleModal: false,
		isLoading: false,
		isError: false,
		lastUpdateTime: null,
		tours: {
			total_items: 0,
			items: [],
		},
	};

	handleFetchTours = async (query) => {
		try {
			this.setState({ isLoading: true });
			const response = await fetchTours(query);
			this.setState({
				tours: response,
				isLoading: false,
			});
		} catch (err) {
			this.setState({ isLoading: false, isError: true });
		}
	};

	async componentDidMount() {
		this.handleFetchTours();
	}

	async componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.theme !== this.props.theme) {
			this.setState({
				lastUpdateTime: moment().format('HH:mm:ss'),
			});
		}

		if (prevState.query !== this.state.query) {
			this.handleFetchTours(this.state.query);
		}
	}

	handleChangeQuery = ({ target: { value: query } }) => {
		this.setState({ query });
	};

	handleToggleModal = () => {
		this.setState((state) => ({ visibleModal: !state.visibleModal }));
	};

	handleAddTours = async (tour) => {
		try {
			await addTour(tour);
			this.handleFetchTours.call(this);
		} catch (err) {
			this.setState({ isError: true });
		}
	};

	handleDeleteTours = async (tourId) => {
		try {
			await deleteTourById(tourId);
			this.handleFetchTours.call(this);
		} catch (err) {
			this.setState({ isError: true });
		}
	};

	render() {
		const { tours, visibleModal, isLoading, isError, lastUpdateTime } = this.state;

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

					{isLoading ? (
						<div>loading...</div>
					) : (
						<>
							{isError ? (
								<div>Something went wrong</div>
							) : (
								<ul>
									<h6>Total tours:{tours.total_items}</h6>
									{tours.items.map((tour) => (
										<ToursItem
											key={tour.id}
											onDelete={this.handleDeleteTours}
											{...tour}
											{...this.props}
										/>
									))}
								</ul>
							)}
						</>
					)}
				</section>
			</>
		);
	}
}

export default Tours;
