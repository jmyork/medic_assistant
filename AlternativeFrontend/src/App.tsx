import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SymptomsPage from './pages/SymptomsPage';
import PossibleDiseasePage from './pages/PossibleDiseasePage';

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const loggedIn = localStorage.getItem('loggedIn') === 'true';
  return loggedIn ? children : <Navigate to="/" replace />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/symptoms"
          element={
            <PrivateRoute>
              <SymptomsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/possible-disease"
          element={
            <PrivateRoute>
              <PossibleDiseasePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
