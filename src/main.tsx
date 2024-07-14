import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/*" element={<div>Error 404 page not found</div>} />
				<Route path="/" element={<App />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
);
