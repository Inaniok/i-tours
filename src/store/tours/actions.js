import { TOURS_ADD_NEW, TOURS_FETCH_QUERY, TOURS_REMOVE_BY_ID } from './constants';

export const fetchToursQuery = (query) => ({
	type: TOURS_FETCH_QUERY,
	payload: query,
});

export const addNewTour = (tour) => ({
	type: TOURS_ADD_NEW,
	payload: tour,
});

export const deleteTour = (id) => {
	return {
		type: TOURS_REMOVE_BY_ID,
		payload: id,
	};
};
