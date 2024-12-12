import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Rentals from './pages/Rentals';
import Customers from './pages/Customers';
import Movies from './pages/Movies';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/rentals" element={<Rentals />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/movies" element={<Movies />} />
            </Routes>
        </Router>
    );
};

export default App;
