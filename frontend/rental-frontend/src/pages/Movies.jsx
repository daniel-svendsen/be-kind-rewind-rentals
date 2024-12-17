import React, {useEffect, useState} from 'react';
import axios from 'axios';
import RegisterMovieForm from "@/components/RegisterMovieForm.jsx";

const Movies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/movies')
            .then(response => setMovies(response.data))
            .catch(error => console.error('Error fetching movies:', error));
    }, []);

    const [selectedMovie, setSelectedMovie] = useState(null); // Store selected customer
    const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility
    const [formData, setFormData] = useState({
        title: "",
        genre: "",
        releaseYear: null,
    });

    const handleUpdateMovie = (movie) => {
        setSelectedMovie(movie);
        setFormData({
            title: movie.title || "",
            genre: movie.genre || "",
            releaseYear: movie.releaseYear || null,
        });
        setIsModalOpen(true);
    };

    // Close modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedMovie(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "releaseYear") {
            const intValue = parseInt(value, 10);
            setFormData((prev) => ({
                ...prev,
                [name]: isNaN(intValue) ? null : intValue,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value, 
            }));
        }
    };

    // Save changes
    const handleSaveChanges = () => {
        const updatedMovie = {
            id: selectedMovie.id,
            title: formData.title,
            genre: formData.genre,
            releaseYear: formData.releaseYear,
        };

        axios
            .put(`http://localhost:8081/movies/${selectedMovie.id}`, updatedMovie)
            .then((response) => {
                console.log("Customer updated successfully:", response.data);
                setMovies((prev) =>
                    prev.map((movie) =>
                        movie.id === selectedMovie.id ? {...movie, ...updatedMovie} : movie
                    )
                );
            })
            .catch((error) => {
                console.error("There was an error updating the movie:", error);
            });

        handleCloseModal();
    };

    const handleDeleteMovie = (id) => {
        axios.delete(`http://localhost:8081/movies/${id}`)
            .then(() => {
                setMovies((prev) => prev.filter((movie) => movie.id !== id));
                console.log("Movie deleted successfully.");
            })
            .catch((error) => {
                console.error("Error deleting movie:", error);
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 space-y-6">
            <h1 className="text-3xl font-bold mb-6">Movies</h1>
            <RegisterMovieForm/>
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-center">Update</h2>
                <ul>
                    {movies.map((movie) => (
                        <li key={movie.id} className="flex justify-between items-center">
                            <button
                                value={movie.id.toString()}
                                className={"mb-4 p-4 border rounded-lg text-left transition-all bg-gray-100 hover w-[200px]"}
                                onClick={() => handleUpdateMovie(movie)} // Pass customer explicitly
                            >
                                {movie.title}
                            </button>
                            <button
                                onClick={() => handleDeleteMovie(movie.id)}
                                className="mb-4 ml-4 p-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>

                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                            <h2 className="text-xl font-bold mb-4">Update Customer</h2>
                            <form>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1" htmlFor="title">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1" htmlFor="genre">
                                        Genre
                                    </label>
                                    <input
                                        type="text"
                                        id="genre"
                                        name="genre"
                                        value={formData.genre}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1" htmlFor="releaseYear">
                                        Release Year
                                    </label>
                                    <input
                                        type="number"
                                        id="releaseYear"
                                        name="releaseYear"
                                        value={formData.releaseYear}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-500"
                                    />
                                    <div className="flex justify-end space-x-4">
                                        <button
                                            type="button"
                                            onClick={handleCloseModal}
                                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleSaveChanges}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Movies;
