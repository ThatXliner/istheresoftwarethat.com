import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import SearchResultsPage from "./pages/SearchResultsPage";
import SoftwareDetailsPage from "./pages/SoftwareDetailsPage";
import ComparePage from "./pages/ComparePage";
import { SoftwareProvider } from "./contexts/SoftwareContext";
import { UserProvider } from "./contexts/UserContext";
import SubmitPage from "./pages/SubmitPage";

function App() {
  return (
    <Router>
      <UserProvider>
        <SoftwareProvider>
          <div className="flex flex-col min-h-screen bg-slate-50">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/software/:id" element={<SoftwareDetailsPage />} />
                <Route path="/compare" element={<ComparePage />} />
                <Route path="/submit" element={<SubmitPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </SoftwareProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
