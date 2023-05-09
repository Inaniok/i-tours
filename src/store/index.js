import { combineReducers, createStore } from 'redux';
import { devToolsEnhancer } from '@redux-devtools/extension';
import { toursReducer } from './tours/reducer';

const enhancer = devToolsEnhancer();

const rootReducer = combineReducers({
	tours: toursReducer,
});

export const store = createStore(rootReducer, enhancer);
