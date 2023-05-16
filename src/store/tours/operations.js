import { addTour, fetchTours } from 'api/tours';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const handleFetchToursQueryThunk = createAsyncThunk(
	'tours/fetchToursQuery',
	async (query, thunkApi) => {
		try {
			const response = await fetchTours(query);
			return response;
		} catch (error) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);

export const handleAddNewTourThunk = createAsyncThunk(
	'tours/handleAddNewTour',
	async ({ tour }, thunkApi) => {
		try {
			const response = await addTour(tour);
			return response;
		} catch (error) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);
