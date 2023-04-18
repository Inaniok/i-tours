import React, { Component } from 'react';
import ToursItem from '../tours-item';

import debounce from 'lodash.debounce';

import './Tours.scss';
import ToursForm from 'components/tours-form/ToursForm';
import { fetchTours } from 'api';
import moment from 'moment';

class Tours extends Component {
	state = {
		query: '',
		visibleModal: false,
		isLoading: false,
		lastUpdateTime: null,
		tours: {
			total_items: 0,
			items: [],
		},
	};

	async componentDidMount() {
		this.setState({ isLoading: true });
		const response = await fetchTours();

		this.setState({
			tours: response,
			isLoading: false,
		});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.theme !== this.props.theme) {
			this.setState({
				lastUpdateTime: moment().format('HH:mm:ss'),
			});
		}
	}

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
		const { query, tours, visibleModal, isLoading, lastUpdateTime } = this.state;

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
						{lastUpdateTime && (
							<p>
								Last update:
								{lastUpdateTime}
							</p>
						)}
					</div>

					{isLoading ? (
						<div>loading...</div>
					) : (
						<ul>
							<h6>Total tours:{tours.total_items}</h6>
							{tours.items
								.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
								.map((tour) => (
									<ToursItem key={tour.id} {...tour} {...this.props} />
								))}
						</ul>
					)}
				</section>
			</>
		);
	}
}

export default Tours;
