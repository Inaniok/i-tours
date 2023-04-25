import { useEffect, useState } from 'react';
import ToursForm from 'components/tours-form/ToursForm';
import ToursItem from 'components/tours-item/ToursItem';
import debounce from 'lodash.debounce';
import { fetchTours } from 'api/tours';
import { addTour } from 'api/tours';
import { deleteTourById } from 'api/tours';
import { useToggle } from 'hooks/useToggle';
import './Tours.scss';

const ToursHook = (props) => {
	const [modalVisible, modalToggle] = useToggle();

	const [query, setQuery] = useState('');
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState(false);

	const [tours, setTours] = useState({
		total_items: 0,
		items: [],
	});

	const handleSetError = (response, successFunc) => {
		if (response.error) {
			setError(true);
		} else {
			successFunc();
		}
	};

	const handleFetchTours = async (query) => {
		setLoading(true);
		const response = await fetchTours(query);
		setLoading(false);

		handleSetError(response, () => setTours(response));
	};

	// componentDidMount & when query were changed(componentDidUpdate) & componentWillUnmount

	useEffect(() => {
		handleFetchTours(query);
	}, [query]);

	const handleAddTours = async (tour) => {
		const response = await addTour(tour);

		handleSetError(response, handleFetchTours);
	};

	const handleDeleteTours = async (tourId) => {
		const response = await deleteTourById(tourId);

		handleSetError(response, handleFetchTours);
	};

	return (
		<>
			<ToursForm visible={modalVisible} onClose={modalToggle} onAddFunc={handleAddTours} />
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
									<ToursItem key={tour.id} onDelete={handleDeleteTours} {...tour} {...props} />
								))}
							</ul>
						)}
					</>
				)}
			</section>
		</>
	);
};

export default ToursHook;
