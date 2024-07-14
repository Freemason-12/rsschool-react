import { useState } from 'react';

export function ErrorButton() {
	const [error, setError] = useState(false);
	if (error) throw new Error('test error');
	return (
		<button
			onClick={(e) => {
				e.preventDefault();
				setError(true);
			}}
		>
			Throw Error
		</button>
	);
}
