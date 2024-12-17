import React, { useState, useEffect } from "react";
import axios from "axios";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

const Rentals = () => {
    const [customers, setCustomers] = useState([]);
    const [movies, setMovies] = useState([]);
    const [rentals, setRentals] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8083/customers").then((res) => setCustomers(res.data));
        axios.get("http://localhost:8081/movies").then((res) => setMovies(res.data));
        axios.get("http://localhost:8082/rentals").then((res) => setRentals(res.data));
    }, []);

    const handleRentMovie = () => {
        if (selectedCustomer && selectedMovie) {
            axios
                .post(`http://localhost:8082/rentals/create`, null, {
                    params: {
                        customerId: selectedCustomer,
                        movieId: selectedMovie,
                    },
                })
                .then(() => {
                    axios.get("http://localhost:8082/rentals").then((res) => setRentals(res.data));
                });
        }
    };

    const handleReturnRental = (rentalId) => {
        axios.delete(`http://localhost:8082/rentals/end/${rentalId}`).then(() => {
            axios.get("http://localhost:8082/rentals").then((res) => setRentals(res.data));
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 space-y-6">
            <h1 className="text-3xl font-bold mb-6">Rental Management</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                {/* Customers List */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 text-center">Customers</h2>
                    <ToggleGroup.Root
                        type="single"
                        className="flex flex-col space-y-2"
                        value={selectedCustomer}
                        onValueChange={setSelectedCustomer}
                    >
                        {customers.map((customer) => (
                            <ToggleGroup.Item
                                key={customer.id}
                                value={customer.id.toString()}
                                className={`p-4 border rounded-lg cursor-pointer text-center transition-all ${
                                    selectedCustomer === customer.id.toString()
                                        ? "bg-blue-500 text-white shadow-lg"
                                        : "bg-gray-100 hover:bg-gray-200"
                                }`}
                            >
                                {customer.name} (ID: {customer.id})
                            </ToggleGroup.Item>
                        ))}
                    </ToggleGroup.Root>
                </div>

                {/* Movies List */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 text-center">Movies</h2>
                    <ToggleGroup.Root
                        type="single"
                        className="flex flex-col space-y-2"
                        value={selectedMovie}
                        onValueChange={setSelectedMovie}
                    >
                        {movies.map((movie) => (
                            <ToggleGroup.Item
                                key={movie.id}
                                value={movie.id.toString()}
                                className={`p-4 border rounded-lg cursor-pointer text-center transition-all ${
                                    selectedMovie === movie.id.toString()
                                        ? "bg-blue-500 text-white shadow-lg"
                                        : "bg-gray-100 hover:bg-gray-200"
                                }`}
                            >
                                {movie.title} (ID: {movie.id})
                            </ToggleGroup.Item>
                        ))}
                    </ToggleGroup.Root>
                </div>
            </div>

            {/* Rent Movie Button */}
            <div className="text-center">
                <button
                    className={`px-6 py-3 rounded-lg text-lg font-semibold transition-all ${
                        selectedCustomer && selectedMovie
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    onClick={handleRentMovie}
                    disabled={!selectedCustomer || !selectedMovie}
                >
                    Rent Movie
                </button>
            </div>

            {/* Rented Movies */}
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
                <h2 className="text-xl font-semibold mb-4 text-center">Rented Movies</h2>
                <ul className="divide-y divide-gray-200">
                    {rentals.map((rental) => (
                        <li
                            key={rental.id}
                            className="flex justify-between items-center p-4 transition-all hover:bg-gray-100 rounded-lg"
                        >
                            <div>
                                <p className="font-semibold">
                                    Customer: {" "}
                                    {customers.find((c) => c.id === rental.customerId)?.name || "Unknown"} (ID: {" "}
                                    {rental.customerId})
                                </p>
                                <p className="text-sm text-gray-500">
                                    Movie: {" "}
                                    {movies.find((m) => m.id === rental.rentalItems[0]?.productId)?.title || "Unknown"} (ID: {" "}
                                    {rental.rentalItems[0]?.productId || "Unknown"})
                                </p>
                                <p className="text-sm text-gray-500">Price: {rental.totalCost}</p>
                            </div>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                onClick={() => handleReturnRental(rental.id)}
                            >
                                End Rental
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Rentals;