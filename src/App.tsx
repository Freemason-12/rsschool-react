import { Component, ReactNode } from 'react';
import { Search } from './components/Search/Search';
import { Results } from './components/Results/Results';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { PlanetSearchResult, getPlanets } from './utils/PlanetsApi';

class App extends Component {
	state = {
		currentState: 'loading' as 'loading' | 'loaded' | 'error',
		data: {} as PlanetSearchResult,
	};
	componentDidMount(): void {
		getPlanets(localStorage.getItem('lastSearch') || '')
			.then((r) => this.setState({ currentState: 'loaded', data: r }))
			.catch(() => this.setState({ currentState: 'error' }));
	}
	render(): ReactNode {
		return (
			<ErrorBoundary>
				<section>
					<Search
						onSearch={(keyword: string) => {
							this.setState({ currentState: 'loading' });
							void getPlanets(keyword).then((r: PlanetSearchResult) =>
								this.setState({
									currentState: 'loaded',
									data: r,
								}),
							);
							localStorage.setItem('lastSearch', keyword.trim());
						}}
					/>
				</section>
				<section>
					<Results
						state={this.state.currentState}
						data={this.state.data}
						onSwitch={(api: string | null | undefined) => {
							fetch(api || '')
								.then((r: Response) => r.json())
								.then((r: PlanetSearchResult) => this.setState({ data: r }))
								.catch(console.error);
						}}
					/>
				</section>
			</ErrorBoundary>
		);
	}
}

export default App;
