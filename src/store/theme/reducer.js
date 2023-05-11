import { createReducer } from '@reduxjs/toolkit';
import { DARK } from 'constants';
import { setTheme } from './actions';

export const themeReducer = createReducer(DARK, (builder) => {
	builder.addCase(setTheme.type, (_, action) => action.payload);
});
