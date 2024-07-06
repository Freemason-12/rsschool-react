import { Component, ReactNode } from 'react';
import { SearchProps } from './Search.types';
import { ErrorButton } from '../ErrorButton/ErrorButton';

export class Search extends Component<SearchProps> {
	state = { currentValue: localStorage.getItem('lastSearch') || '' };
	handleValueChange(value: string) {
		this.setState({ currentValue: value });
	}
	render(): ReactNode {
		return (
			<>
				<form
					onSubmit={(e: React.FormEvent) => {
						e.preventDefault();
						console.log('event here', this.state.currentValue);
						this.props.onSearch
							? this.props.onSearch(this.state.currentValue)
							: '';
					}}
				>
					<input
						type="text"
						value={this.state.currentValue}
						onChange={(e: React.FormEvent<HTMLInputElement>) =>
							this.handleValueChange(e.currentTarget.value)
						}
					/>
					<button type="submit">Search</button>
					<ErrorButton />
				</form>
			</>
		);
	}
}
