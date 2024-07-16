import { FC, useState, useEffect } from 'react';
// import { DetailedCardProps } from './DetailedCard.types';
import { useSearchParams } from 'react-router-dom';
import { Planet } from '../../utils/PlanetsApi';

export const DetailedCard: FC = () => {
	const [state, setState] = useState('loading');
	const [data, setData] = useState({} as Planet);
	const [params, setParams] = useSearchParams();

	useEffect(() => {
		if (params.get('planet'))
			fetch(`https://swapi.dev/api/planets/${params.get('planet')}`)
				.then((r: Response) => r.json())
				.then((r: Planet) => {
					setState('loaded');
					setData(r);
				})
				.catch(console.error);
		else setState('hidden');
	}, [params]);

	return state === 'loading' ? (
		<div>loading</div>
	) : state == 'hidden' ? (
		<></>
	) : state === 'error' ? (
		<div>error</div>
	) : (
		<div>
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
