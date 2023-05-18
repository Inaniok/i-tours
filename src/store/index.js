import { configureStore } from '@reduxjs/toolkit';
// import { toursReducer } from './tours/toursSlice';
import { themeReducer } from './theme/reducer';
import { toursApi } from './tours/toursApi';

export const store = configureStore({
	reducer: {
		theme: themeReducer,
		[toursApi.reducerPath]: toursApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(toursApi.middleware),
});
