import { FC, useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import planetsApi from '../../store/apiQuery';
import { Planet } from '../../utils/PlanetsApi';
import styles from './DetailedCard.module.css';

export const DetailedCard: FC = () => {
	const [state, setState] = useState('loading');
	const [data, setData] = useState({} as Planet);
	const [params, setParams] = useSearchParams();
	const theme = useContext(ThemeContext);
	const planet = planetsApi.useGetPlanetQuery(Number(params.get('planet')), {
		skip: !params.get('planet'),
	});

	useEffect(() => {
		if (params.get('planet')) {
			if (planet.isFetching) {
				setState('loading');
				setData({} as Planet);
			} else if (planet.isError) setState('error');
			else {
				setState('loaded');
				setData(planet.data || ({} as Planet));
			}
		} else setState('hidden');
	}, [params, planet]);

	return state === 'loading' ? (
		<div>loading</div>
	) : state == 'hidden' ? (
		<></>
	) : state === 'error' ? (
		<div>error</div>
	) : (
		<div className={`${styles.detailedCard} ${styles[theme]}`}>
			<button
				onClick={() => {
					setState('hidden');
					params.delete('planet');
					setParams(params);
				}}
			>
				close
			</button>
			<h1>{data.name}</h1>
			<table>
				<tbody>
					<tr>
						<td>Rotation Period</td>
						<td>{data.rotation_period}</td>
					</tr>
					<tr>
						<td>Oebital Period</td>
						<td>{data.orbital_period}</td>
					</tr>
					<tr>
						<td>Diameter</td>
						<td>{data.diameter}</td>
					</tr>
					<tr>
						<td>Climate</td>
						<td>{data.climate}</td>
					</tr>
					<tr>
						<td>Gravity</td>
						<td>{data.gravity}</td>
					</tr>
					<tr>
						<td>Terrain</td>
						<td>{data.terrain}</td>
					</tr>
					<tr>
						<td>Surface Water</td>
						<td>{data.surface_water}</td>
					</tr>
					<tr>
						<td>Population</td>
						<td>{data.population}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
