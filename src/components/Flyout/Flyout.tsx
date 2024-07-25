import { useSelector, useDispatch } from 'react-redux';
import { selectedPlanets } from '../../store/selectedPlanets';
import { CSVLink } from 'react-csv';
import { Planet } from '../../utils/PlanetsApi';
import styles from './Flyout.module.css';

export function Flyout() {
	const checkedPlanets = useSelector(
		(state: { selectedPlanets: Planet[] }) => state.selectedPlanets,
	);
	const dispatch = useDispatch();
	return (
		<div
			className={`${styles.flyout} ${styles[checkedPlanets.length ? 'nonempty' : 'empty']}`}
		>
			<div>{checkedPlanets.length} items selected</div>
			<button onClick={() => dispatch(selectedPlanets.actions.clear())}>
				Deselect All
			</button>
			<CSVLink
				data={checkedPlanets}
				filename={`${checkedPlanets.length}_planets.csv`}
			>
				<button>Download</button>
			</CSVLink>
		</div>
	);
}
