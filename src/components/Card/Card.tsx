import { FC } from 'react';
import { CardProps } from './Card.types';
import styles from './Card.module.css';

export const Card: FC<CardProps> = ({ name, onClick }) => (
	<button className={styles.button} onClick={onClick}>
		<h1>{name}</h1>
	</button>
);
