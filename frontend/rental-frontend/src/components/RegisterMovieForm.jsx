import React, {useState} from 'react';
import axios from "axios";

function RegisterMovieForm() {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [releaseYear, setReleaseYear] = useState(null);

    const handleSubmit = (event) => {
        //event.preventDefault();

        const data = {
            title: title,
            genre: genre,
            releaseYear: releaseYear
        }
        axios
            .post('http://localhost:8081/movies', data)
            .then((response) => {
                console.log("Movie created successfully:", response.data);
            })
            .catch((error) => {
                console.error("There was an error creating the movie:", error);
            });
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-center">Register</h2>
            <form onSubmit={handleSubmit} className="max-w-md w-full bg-base-300 rounded p-6 space-y-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="p-4 border rounded-lg text-left transition-all bg-gray-100 hover"
                />
                <input
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    placeholder="Genre"
                    className="p-4 border rounded-lg text-left transition-all bg-gray-100 hover"
                />
                <input
                    type="number"
                    value={releaseYear}
                    onChange={(e) => setReleaseYear(e.target.value)}
                    placeholder="Release Year"
                    className="p-4 border rounded-lg text-left transition-all bg-gray-100 hover"
                />
                <div className="flex">
                    <input type="submit"
                           value="Register"
                           className={`btn btn-primary px-6 py-3 rounded-lg text-lg font-semibold transition-all ${
                               title && genre && releaseYear
                                   ? "bg-green-500 text-white hover:bg-green-600"
                                   : "bg-gray-300 text-gray-500 cursor-not-allowed"
                           }`} disabled={!title || !genre || !releaseYear}/>
                </div>
            </form>
        </div>
    );
}

export default RegisterMovieForm;