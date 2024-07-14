// import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Search } from './components/Search/Search';
import { Results } from './components/Results/Results';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';

function App() {
	const navigate = useNavigate();
	return (
		<ErrorBoundary>
			<section>
				<Search
					onSearch={(keyword: string) => {
						navigate(`/?search=${keyword}`);
					}}
				/>
			</section>
			<section>
				<Results />
			</section>
		</ErrorBoundary>
	);
}

export default App;
