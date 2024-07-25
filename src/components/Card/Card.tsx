import { FC, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { CardProps } from './Card.types';
import styles from './Card.module.css';

export const Card: FC<CardProps> = ({
	name,
	onClick,
	onChange,
	checked,
	id,
}) => {
	const theme = useContext(ThemeContext);
	return (
		<div className={styles.card}>
			<button
				key={id}
				className={`${styles.button} ${styles[theme]}`}
				onClick={onClick}
			>
				<h1>{name}</h1>
			</button>
			<input
				type="checkbox"
				className={styles.checkbox}
				checked={checked}
				onChange={onChange}
				// onClick={(e) => {
				// 	if (e.currentTarget.checked) onChecked ? onChecked() : '';
				// 	else onUnchecked ? onUnchecked() : '';
				// }}
			/>
		</div>
	);
};
