import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Movies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8082/api/movies')
            .then(response => setMovies(response.data))
            .catch(error => console.error('Error fetching movies:', error));
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-6">Movies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies.map(movie => (
                    <div key={movie.id} className="bg-white shadow-md rounded overflow-hidden">
                        <div className="p-4">
                            <h3 className="text-xl font-bold">{movie.title}</h3>
                            <p className="text-gray-700">{movie.genre}</p>
                            <p className="text-gray-500 text-sm">Released: {movie.releaseYear}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Movies;
