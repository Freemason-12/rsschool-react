// import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from './components/Search/Search';
import { Results } from './components/Results/Results';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';

function App() {
	const [params, setParams] = useSearchParams();
	return (
		<ErrorBoundary>
			<section>
				<Search
					onSearch={(keyword: string) => {
						params.delete('page');
						params.set('search', keyword);
						setParams(params);
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
