
import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router';
import Layout from './components/Layout';
import Dashboard from './pages/dashboard';
import Report from './pages/report';
import SearchScores from './pages/search-scores';

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/report" element={<Report />} />
					<Route path="/search-scores" element={<SearchScores />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
};

export default AppRouter;
