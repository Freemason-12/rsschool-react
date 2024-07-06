import { Component, ErrorInfo, ReactNode } from 'react';

export class ErrorBoundary extends Component<{ children: ReactNode }> {
	state = { error: false };
	static getDerivedStateFromError(err: Error) {
		return { error: err };
	}
	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.log(error, errorInfo);
	}
	render() {
		if (this.state.error) return <p>Oopsie! Error!</p>;
		return this.props.children;
	}
}
