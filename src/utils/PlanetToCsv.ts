import { Planet } from './PlanetsApi';
export function PlanetToCsv(p: Planet | Planet[]): string {
	const header =
		'Name,Rotation Period,Orbital Period,Diameter,Climate,Gravity,Terrain,Surface Water,Population';
	const assembleBody = (x: Planet) =>
		`${header}\n${x.name},${x.rotation_period},${x.orbital_period},${x.diameter},${x.climate},${x.gravity},${x.terrain},${x.surface_water},${x.population}`;
	const body = Array.isArray(p)
		? p.map((x: Planet) => assembleBody(x)).join('\n')
		: assembleBody(p);
	return `${header}\n${body}`;
}
