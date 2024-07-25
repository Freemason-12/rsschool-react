import { FormEvent, FC, useState } from 'react';
import { SearchProps } from './Search.types';
import { ErrorButton } from '../ErrorButton/ErrorButton';
import styles from './Search.module.css';

export const Search: FC<SearchProps> = ({ onSearch }) => {
	const [currentValue, setCurrentValue] = useState(
		localStorage.getItem('lastSearch') || '',
	);
	return (
		<>
			<form
				className={styles.form}
				onSubmit={(e: React.FormEvent) => {
					e.preventDefault();
					onSearch ? onSearch(currentValue) : '';
					localStorage.setItem('lastSearch', currentValue);
				}}
			>
				<input
					type="text"
					value={currentValue}
					onChange={(e: FormEvent<HTMLInputElement>) =>
						setCurrentValue(e.currentTarget.value)
					}
				/>
				<button type="submit">Search</button>
				<ErrorButton />
			</form>
		</>
	);
};
