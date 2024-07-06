import { PlanetSearchResult } from '../../utils/PlanetsApi';
export type ResultsProps = Readonly<{
	state: 'loading' | 'loaded' | 'error';
	data?: PlanetSearchResult;
	onSwitch: (api: string | null | undefined) => void;
}>;
