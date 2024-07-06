import { Component } from 'react';

export class ErrorButton extends Component {
	state = { error: false };
	render() {
		if (this.state.error) throw new Error('test error');
		return (
			<button
				onClick={(e) => {
					e.preventDefault();
					this.setState({ error: true });
				}}
			>
				Throw Error
			</button>
		);
	}
}
