import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between">
                <h1 className="text-xl font-bold">Film Rental</h1>
                <ul className="flex space-x-4">
                    <li><Link to="/" className="hover:underline">Home</Link></li>
                    <li><Link to="/rentals" className="hover:underline">Rentals</Link></li>
                    <li><Link to="/customers" className="hover:underline">Customers</Link></li>
                    <li><Link to="/movies" className="hover:underline">Movies</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
