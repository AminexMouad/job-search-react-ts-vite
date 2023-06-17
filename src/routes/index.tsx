import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/Home';
import NotFoundPage from '../pages/NotFoundPage';
import LoginPage from '../pages/Login';
import ConnectionChecker from '../layouts/ConnectionChecker';
import LoadingDataFromStorage from '../layouts/LoadingDataFromStorage';

const Routing: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<LoadingDataFromStorage />}>
          <Route path='/login' element={<LoginPage />} />
          <Route element={<ConnectionChecker />}>
            <Route path='/' element={<HomePage />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default Routing;
