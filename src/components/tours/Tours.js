import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToggle } from 'hooks/useToggle';
import { Outlet, useParams } from 'react-router-dom';

import { getTours } from 'store/tours/selectors';

import ToursForm from 'components/tours-form/ToursForm';
import ToursItem from 'components/tours-item/ToursItem';

import debounce from 'lodash.debounce';
import { fetchTours } from 'api/tours';
import { addTour } from 'api/tours';
import { deleteTourById } from 'api/tours';

import './Tours.scss';
import { addNewTour, deleteTour, fetchToursQuery } from 'store/tours/actions';
import { TOURS_ADD_NEW } from 'store/tours/constants';

const Tours = () => {
	const dispatch = useDispatch();
	const [modalVisible, modalToggle] = useToggle();
	const { tourId } = useParams();

	const [query, setQuery] = useState('');
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState(false);

	const tours = useSelector(getTours);

	const handleSetError = (response, successFunc) => {
		if (response.error) {
			setError(true);
		} else {
			successFunc();
		}
	};

	const handleFetchTours = useCallback(async (query) => {
		setLoading(true);
		const response = await fetchTours(query);
		setLoading(false);

		// handleSetError(response, () => setTours(response));
	}, []);

	// componentDidMount & when query were changed(componentDidUpdate) & componentWillUnmount

	useEffect(() => {
		dispatch(fetchToursQuery(query));
	}, [query, dispatch]);

	// componentWillUnmount

	useEffect(() => () => console.log('component unmount'), []);

	const handleAddTours = async (tour) => {
		// const response = await addTour(tour);
		// handleSetError(response, handleFetchTours);
		dispatch(addNewTour({ ...tour, id: Math.ceil(Math.random() * 1000) }));
	};

	const handleDeleteTours = async (tourId) => {
		// const response = await deleteTourById(tourId);
		// handleSetError(response, handleFetchTours);

		dispatch(deleteTour(tourId));
	};

	return (
		<>
			<ToursForm visible={modalVisible} onClose={modalToggle} onAddFunc={handleAddTours} />

			{!tourId && <Outlet />}

			<section className='tours-page'>
				<div className='tours-page__controlls'>
					<h1>Tours page</h1>
					<input
						type='text'
						placeholder='search by name...'
						onChange={debounce((e) => setQuery(e.target.value), 1000)}
					/>
					<button onClick={modalToggle}>Open Modal </button>
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
									<ToursItem key={tour.id} onDelete={handleDeleteTours} {...tour} />
								))}
							</ul>
						)}
					</>
				)}
			</section>
		</>
	);
};

export default Tours;
