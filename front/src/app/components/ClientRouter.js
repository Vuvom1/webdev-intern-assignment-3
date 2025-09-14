"use client";

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router';
import Layout from './Layout';
import Dashboard from '../pages/dashboard';
import Report from '../pages/report';
import SearchScores from '../pages/search-scores';

const ClientRouter = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Layout Link={() => <div>Loading...</div>}>
        <div className="p-8 text-xl font-semibold">Loading...</div>
      </Layout>
    );
  }

  return (
    <BrowserRouter>
      <Layout Link={Link}>
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

export default ClientRouter;
