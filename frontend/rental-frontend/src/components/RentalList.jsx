import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RentalList = () => {
    const [rentals, setRentals] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8082/rentals')
            .then(response => setRentals(response.data))
            .catch(error => console.error('Error fetching rentals:', error));
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-4">Rental List</h2>
            <table className="w-full bg-white shadow-md rounded border-collapse">
                <thead>
                <tr className="bg-gray-200 text-left">
                    <th className="p-4">Rental ID</th>
                    <th className="p-4">Customer ID</th>
                    <th className="p-4">Total Cost</th>
                </tr>
                </thead>
                <tbody>
                {rentals.map(rental => (
                    <tr key={rental.id} className="border-t">
                        <td className="p-4">{rental.id}</td>
                        <td className="p-4">{rental.customerId}</td>
                        <td className="p-4">${rental.totalCost.toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default RentalList;
