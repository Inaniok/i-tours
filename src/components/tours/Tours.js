import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useToggle } from 'hooks/useToggle';

import { useDispatch, useSelector } from 'react-redux';
import { deleteTour } from 'store/tours/toursSlice';
import { selectTours, selectToursWithDescription } from 'store/tours/selectors';

import ToursForm from 'components/tours-form/ToursForm';
import ToursItem from 'components/tours-item/ToursItem';

import debounce from 'lodash.debounce';

import './Tours.scss';
import { handleAddNewTourThunk, handleFetchToursQueryThunk } from 'store/tours/operations';
import { useAddNewTourMutation, useGetToursQuery } from 'store/tours/toursApi';

const Tours = () => {
	const dispatch = useDispatch();
	const [modalVisible, modalToggle] = useToggle();
	const { tourId } = useParams();

	const [query, setQuery] = useState('');

	const { data, isLoading, error } = useGetToursQuery(query);
	const [addNewTour, result] = useAddNewTourMutation();

	// componentDidMount & when query were changed(componentDidUpdate) & componentWillUnmount

	// useEffect(() => {
	// 	dispatch(handleFetchToursQueryThunk(query));
	// }, [query, dispatch]);

	// componentWillUnmount

	const handleAddTours = async (tour) => {
		addNewTour({ tour });
	};

	const handleDeleteTours = async (tourId) => {
		// const response = await deleteTourById(tourId);
		// handleSetError(response, handleFetchTours);

		dispatch(deleteTour(tourId));
	};

	console.log(data, error);

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
						{error ? (
							<div>{error.error}</div>
						) : (
							<ul>
								<h6>Total tours:{data.total_items}</h6>
								{data.items.map((tour) => (
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
