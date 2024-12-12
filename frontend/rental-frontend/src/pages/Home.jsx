import React from 'react';

const Home = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="text-center">
                <h1 className="text-5xl font-bold mb-4">Welcome to Be Kind Rewind Rentals!</h1>
                <p className="text-lg mb-6">Discover and rent your favorite movies online!</p>
                <a href="/movies" className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600">
                    Browse Movies
                </a>
            </div>
        </div>
    );
};

export default Home;
