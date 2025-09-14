import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import SearchScores from './pages/search-scores';
import Dashboard from './pages/dashboard';
import Report from './pages/report';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/search-scores"
          element={
            <Layout>
              <SearchScores />
            </Layout>
          }
        />
        <Route
          path="/report"
          element={
            <Layout>
              <Report />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}
