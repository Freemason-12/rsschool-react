import { Component } from 'react';
import { ResultsProps } from './Results.types';
import { Planet } from '../../utils/PlanetsApi';
import styles from './Results.module.css';

export class Results extends Component<ResultsProps> {
	render() {
		return this.props.state === 'loading' ? (
			'loading'
		) : this.props.state === 'error' ? (
			'error'
		) : (
			<div className={styles.results}>
				<ul className={styles.resultsList}>
					{this.props.data?.results.map((planet: Planet) => (
						<li key={planet.url} className={styles.resultItem}>
							<h2 className={styles.planetName}>{planet.name}</h2>
							<input
								className={styles.toggleProperties}
								type="radio"
								name="properties"
							/>
							<table>
								<tr>
									<td>Diameter:</td>
									<td>{planet.diameter}</td>
								</tr>
								<tr>
									<td>Rotation period:</td>
									<td>{planet.rotation_period}</td>
								</tr>
								<tr>
									<td>Orbital period:</td>
									<td>{planet.orbital_period}</td>
								</tr>
								<tr>
									<td>Gravity:</td>
									<td>{planet.gravity}</td>
								</tr>
								<tr>
									<td>Population:</td>
									<td>{planet.population}</td>
								</tr>
							</table>
						</li>
					))}
				</ul>
				<div>
					<button
						disabled={this.props.data?.previous === null}
						onClick={() => this.props.onSwitch(this.props.data?.previous)}
					>
						Previous
					</button>
					<button
						disabled={this.props.data?.next === null}
						onClick={() => this.props.onSwitch(this.props.data?.next)}
					>
						Next
					</button>
				</div>
			</div>
		);
	}
}
