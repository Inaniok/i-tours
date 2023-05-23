// import HTTPClient from './config';

// const _errorResponse = () => ({ error: true });

// const fetchTours = (query = false) => {
// 	const requestURL = query ? `/tours?name_like=${query}` : '/tours';

// 	return HTTPClient.get(requestURL).then(({ data }) => ({
// 		total_items: data.length,
// 		items: data,
// 	}));
// };

// const addTour = (tour) => {
// 	return HTTPClient.post('/tours', tour).then(({ data }) => data);
// };

// const deleteTourById = (tourId) => {
// 	return HTTPClient.delete(`/tours/${tourId}`).catch(_errorResponse);
// };

// export { fetchTours, addTour, deleteTourById };
