import { FC, useState, useEffect } from 'react';
import { getPlanets, Planet, PlanetSearchResult } from '../../utils/PlanetsApi';
import { useSearchParams } from 'react-router-dom';
import { Card } from '../Card/Card';
import { DetailedCard } from '../DetailedCard/DetailedCard';
import styles from './Results.module.css';

export const Results: FC = () => {
	const [state, setState] = useState('loading');
	const [data, setData] = useState({} as PlanetSearchResult);
	const [params, setSearchParams] = useSearchParams();
	// const navigate = useNavigate();

	useEffect(() => {
		console.log(params);
		getPlanets(
			params.get('search') || undefined,
			Number(params.get('page')) || undefined,
		)
			.then((r: PlanetSearchResult) => {
				setData(r);
				setState('loaded');
			})
			.catch((e: Error) => {
				setState('error');
				console.error(e);
			});
	}, [params]);

	return state === 'loading' ? (
		<div className={styles.results}>loading</div>
	) : state === 'error' ? (
		<div className={styles.results}>error</div>
	) : (
		<div className={styles.main}>
			<div className={styles.results}>
				<div className={styles.resultsList}>
					{data?.results.map((planet: Planet) => (
						<Card
							key={planet.url}
							name={planet.name}
							onClick={() => {
								const planetId = planet.url.match(/[0-9]+/);
								if (planetId) {
									params.set('planet', planetId[0]);
									setSearchParams(params);
								}
							}}
						/>
					))}
				</div>
				<div>
					<button
						disabled={data.previous === null}
						onClick={() => {
							if (data.previous) {
								setState('loading');
								params.set('page', `${(Number(params.get('page')) || 1) - 1}`);
								setSearchParams(params);
							}
						}}
					>
						Previous
					</button>
					<button
						disabled={data.next === null}
						onClick={() => {
							if (data.next) {
								setState('loading');
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
