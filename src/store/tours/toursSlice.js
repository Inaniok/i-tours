const { createSlice } = require('@reduxjs/toolkit');
const { TOURS } = require('constants');

const initialState = {
	total_items: 0,
	items: [],
};

const toursSlice = createSlice({
	name: 'tours',
	initialState,
	reducers: {
		fetchToursQuery: {
			reducer: (state, action) => {
				state.total_items = TOURS.length;
				state.items = TOURS.filter((el) =>
					el.name.toLowerCase().includes(action.payload.toLowerCase())
				);
			},
			prepare: (payload) => ({ payload }),
		},
		addNewTour: {
			reducer: (state, action) => {
				state.total_items += 1;
				state.items.push({ ...action.payload, id: Math.ceil(Math.random() * 1000) });
			},
			prepare: (payload) => ({ payload }),
		},
		deleteTour: {
			reducer: (state, action) => {
				state.total_items -= 1;
				state.items = state.items.filter((el) => el.id !== action.payload);
			},
			prepare: (payload) => ({ payload }),
		},
		deleteTo: (state, action) => {
			const index = state.findIndex((task) => task.id === action.payload);
			state.splice(index, 1);
		},
		deleteTask(state, action) {
			const index = state.findIndex((task) => task.id === action.payload);
			state.splice(index, 1);
		},
	},
});

export const { fetchToursQuery, addNewTour, deleteTour } = toursSlice.actions;

export const toursReducer = toursSlice.reducer;
