export type Planet = {
	climate: string;
	created: string;
	edited: string;
	diameter: string;
	films: string[];
	gravity: string;
	name: string;
	orbital_period: string;
	population: string;
	residents: string[];
	rotation_period: string;
	surface_water: string;
	terrain: string;
	url: string;
};

export type PlanetSearchResult = {
	count: number;
	next: string | null;
	previous: string | null;
	results: Planet[];
};

export const getPlanets = async (search?: string) =>
	(await fetch(
		`https://swapi.dev/api/planets/${search ? '?search=' + search : ''}`,
	).then((r) => r.json())) as PlanetSearchResult;
