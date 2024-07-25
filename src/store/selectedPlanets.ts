import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Planet } from '../utils/PlanetsApi';

export const selectedPlanets = createSlice({
	name: 'selectedPlanets',
	reducerPath: 'selectedPlanets',
	initialState: [] as Planet[],
	reducers: {
		add(state, action: PayloadAction<Planet>) {
			state.push(action.payload);
		},
		remove(state, action: PayloadAction<string>) {
			const indexToRemove = state.indexOf(
				state.find((p: Planet) => p.name === action.payload) || ({} as Planet),
			);
			if (indexToRemove >= 0) state.splice(indexToRemove, 1);
			else throw Error('planet being removed was not selected');
		},
		clear(state) {
			while (state.length) state.pop();
		},
	},
});
