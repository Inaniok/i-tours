import { handleAddNewTourThunk, handleFetchToursQueryThunk } from './operations';

const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
	isLoading: false,
	error: null,
	total_items: 0,
	items: [],
};

const toursSlice = createSlice({
	name: 'tours',
	initialState,
	reducers: {
		deleteTour: {
			reducer: (state, action) => {
				state.total_items -= 1;
				state.items = state.items.filter((el) => el.id !== action.payload);
			},
			prepare: (payload) => ({ payload }),
		},
		deleteTask(state, action) {
			const index = state.findIndex((task) => task.id === action.payload);
			state.splice(index, 1);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(handleFetchToursQueryThunk.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(handleFetchToursQueryThunk.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;

				state.total_items = action.payload.total_items;
				state.items = action.payload.items;
			})
			.addCase(handleFetchToursQueryThunk.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(handleAddNewTourThunk.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(handleAddNewTourThunk.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;

				state.total_items += 1;
				state.items.push(action.payload);
			})
			.addCase(handleAddNewTourThunk.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { deleteTour } = toursSlice.actions;

export const toursReducer = toursSlice.reducer;
