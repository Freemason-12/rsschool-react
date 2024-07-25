import { FC } from 'react';
import { Planet } from '../../utils/PlanetsApi';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectedPlanets } from '../../store/selectedPlanets';
import { Card } from '../Card/Card';
import { DetailedCard } from '../DetailedCard/DetailedCard';
import planetsApi from '../../store/apiQuery';
import styles from './Results.module.css';

export const Results: FC = () => {
	const [params, setSearchParams] = useSearchParams();
	const dispatch = useDispatch();
	const checkedPlanets = useSelector(
		(state: { selectedPlanets: Planet[] }) => state.selectedPlanets,
	);
	const planets = planetsApi.useSearchPlanetsQuery({
		keyword: params.get('search') || '',
		page: Number(params.get('page')) || 1,
	});

	return planets.isLoading ? (
		<div className={styles.results}>loading</div>
	) : planets.isError ? (
		<div className={styles.results}>error</div>
	) : (
		<div className={styles.main}>
			<div className={styles.results}>
				<div className={styles.resultsList}>
					{planets.data?.results.map((planet: Planet) => (
						<Card
							key={planet.url}
							name={planet.name}
							checked={Boolean(
								checkedPlanets.find((p: Planet) => p.name === planet.name),
							)}
							onClick={() => {
								const planetId = planet.url.match(/[0-9]+/);
								if (planetId) {
									params.set('planet', planetId[0]);
									setSearchParams(params);
								}
							}}
							onChange={(e) => {
								if (e.currentTarget.checked)
									dispatch(selectedPlanets.actions.add(planet));
								else dispatch(selectedPlanets.actions.remove(planet.name));
							}}
						/>
					))}
				</div>
				<div>
					<button
						disabled={!planets.data?.previous}
						onClick={() => {
							if (planets.data?.previous) {
								params.set('page', `${(Number(params.get('page')) || 1) - 1}`);
								setSearchParams(params);
							}
						}}
					>
						Previous
					</button>
					<button
						disabled={!planets.data?.next}
						onClick={() => {
							if (planets.data?.next) {
								params.set('page', `${(Number(params.get('page')) || 1) + 1}`);
								setSearchParams(params);
							}
						}}
					>
						Next
					</button>
				</div>
			</div>
			<div className={styles.sidebar}>
				<DetailedCard />
			</div>
		</div>
	);
};
