import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from './components/Search/Search';
import { Results } from './components/Results/Results';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { ThemeContext } from './context/ThemeContext';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { Flyout } from './components/Flyout/Flyout';
import './App.css';

function App() {
	const [params, setParams] = useSearchParams();
	const [theme, setTheme] = useState('dark');
	return (
		<ErrorBoundary>
			<Provider store={store}>
				<ThemeContext.Provider value={theme}>
					<div className={theme}>
						<section>
							<button
								onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
							>
								Go to {theme === 'dark' ? 'light' : 'dark'} mode
							</button>
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
							<Flyout />
						</section>
					</div>
				</ThemeContext.Provider>
			</Provider>
		</ErrorBoundary>
	);
}

export default App;
