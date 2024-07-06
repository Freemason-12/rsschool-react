import { Component, ErrorInfo, ReactNode } from 'react';
import { Search } from './components/Search/Search';
import { Results } from './components/Results/Results';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { PlanetSearchResult, getPlanets } from './utils/PlanetsApi';

class App extends Component {
	state = {
		state: 'loading' as 'loading' | 'loaded' | 'error',
		data: {} as PlanetSearchResult,
	};
	componentDidMount(): void {
		getPlanets()
			.then((r) => this.setState({ state: 'loaded', data: r }))
			.catch(() => this.setState({ state: 'error' }));
	}
	render(): ReactNode {
		return (
			<ErrorBoundary>
				<section>
					<Search
						onSearch={(keyword: string) => {
							this.setState({ state: 'loading' });
							getPlanets(keyword).then((r) =>
								this.setState({ state: 'loaded', data: r }),
							);
							localStorage.setItem('lastSearch', keyword.trim());
						}}
					/>
				</section>
				<section>
					<Results
						state={this.state.state}
						data={this.state.data}
						onSwitch={(api: string | null | undefined) => {
							fetch(api || '')
								.then((r) => r.json())
								.then((r) => this.setState({ data: r }));
						}}
					/>
				</section>
			</ErrorBoundary>
		);
	}
}

export default App;
