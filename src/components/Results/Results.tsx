import { FC, useState, useEffect } from 'react';
// import { ResultsProps } from './Results.types';
import { getPlanets, Planet, PlanetSearchResult } from '../../utils/PlanetsApi';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import styles from './Results.module.css';

export const Results: FC = () => {
	const [state, setState] = useState('loading');
	const [data, setData] = useState({} as PlanetSearchResult);
	const [params] = useSearchParams();
	const navigate = useNavigate();

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
		<div>
			<div className={styles.results}>
				<ul className={styles.resultsList}>
					{data?.results.map((planet: Planet) => (
						<li key={planet.url} className={styles.resultItem}>
							<h2 className={styles.planetName}>{planet.name}</h2>
						</li>
					))}
				</ul>
				<div>
					<button
						disabled={data.previous === null}
						onClick={() => {
							if (data.previous) {
								setState('loading');
								navigate(
									`/?search=${params.get('search')}&page=${Number(params.get('page') || 1) - 1}`,
								);
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
								navigate(
									`/?search=${params.get('search')}&page=${Number(params.get('page') || 1) + 1}`,
								);
							}
						}}
					>
						Next
					</button>
				</div>
				<div className={styles.sidebar}></div>
			</div>
		</div>
	);
};
