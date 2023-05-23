import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { themeReducer } from './theme/reducer';
import { authReducer } from './auth/authSlice';
import { toursApi } from './tours/toursApi';

// Persisting token field from auth slice to localstorage
const authPersistConfig = {
	key: 'auth',
	storage,
	whitelist: ['token'],
};

export const store = configureStore({
	reducer: {
		theme: themeReducer,
		auth: persistReducer(authPersistConfig, authReducer),
		[toursApi.reducerPath]: toursApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(toursApi.middleware),
});

export const persistor = persistStore(store);
