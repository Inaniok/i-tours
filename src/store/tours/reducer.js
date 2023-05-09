import { TOURS } from 'constants';
import { TOURS_ADD_NEW, TOURS_FETCH_QUERY, TOURS_REMOVE_BY_ID } from './constants';

const initialState = {
	total_items: 0,
	items: [],
};

export const toursReducer = (state = initialState, action) => {
	switch (action.type) {
		case TOURS_FETCH_QUERY:
			const items = TOURS.filter((el) =>
				el.name.toLowerCase().includes(action.payload.toLowerCase())
			);
			return {
				total_items: TOURS.length,
				items,
			};
		case TOURS_ADD_NEW:
			return {
				total_items: state.total_items + 1,
				items: [...state.items, action.payload],
			};
		case TOURS_REMOVE_BY_ID:
			return {
				total_items: state.total_items - 1,
				items: state.items.filter((el) => el.id !== action.payload),
			};
		default:
			return state;
	}
};
