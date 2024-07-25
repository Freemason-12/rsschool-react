import { configureStore } from '@reduxjs/toolkit';
import planetsApi from './apiQuery';
import { selectedPlanets } from './selectedPlanets';

export const store = configureStore({
	reducer: {
		[selectedPlanets.reducerPath]: selectedPlanets.reducer,
		[planetsApi.reducerPath]: planetsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(planetsApi.middleware),
});
