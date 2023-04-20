import HTTPClient from './config';

const fetchTours = (query = false) => {
	const requestURL = query ? `/tours?name_like=${query}` : '/tours';

	return HTTPClient.get(requestURL).then(({ data }) => ({
		total_items: data.length,
		items: data,
	}));
};

const addTour = (tour) => {
	return HTTPClient.post('/tours', tour);
};

const deleteTourById = (tourId) => {
	return HTTPClient.delete(`/tours/${tourId}`);
};

export { fetchTours, addTour, deleteTourById };
