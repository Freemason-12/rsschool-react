import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Planet, PlanetSearchResult } from '../utils/PlanetsApi';

const planetsApi = createApi({
	reducerPath: 'planets',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/planets/' }),
	endpoints: (builder) => ({
		getPlanet: builder.query<Planet, number>({
			query: (id: number) => `${id}`,
		}),
		searchPlanets: builder.query<
			PlanetSearchResult,
			{ keyword: string; page: number }
		>({
			query: (arg: { keyword: string; page: number }) =>
				`?search=${arg.keyword}&page=${arg.page}`,
		}),
	}),
});
export default planetsApi;
