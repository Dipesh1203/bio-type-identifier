import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AnalysisPage from './pages/AnalysisPage';
import HistoryPage from './pages/HistoryPage';
import AboutPage from './pages/AboutPage';
import { FingerprintProvider } from './context/FingerprintContext';
import { ParticleBackground } from './components/ui/ParticleBackground';

function App() {
  return (
    <FingerprintProvider>
      <div className="flex flex-col min-h-screen bg-slate-50">
        <ParticleBackground />
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/analysis" element={<AnalysisPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </FingerprintProvider>
  );
}

export default App;