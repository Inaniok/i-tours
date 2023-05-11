import { configureStore } from '@reduxjs/toolkit';
import { toursReducer } from './tours/toursSlice';
import { themeReducer } from './theme/reducer';

export const store = configureStore({
	reducer: {
		theme: themeReducer,
		tours: toursReducer,
	},
});
