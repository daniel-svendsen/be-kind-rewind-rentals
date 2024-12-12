import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RentalList() {
    const [rentals, setRentals] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8082/rentals')
            .then(response => {
                console.log(response.data); // Kontrollera strukturen
                setRentals(response.data || []);
            })
            .catch(error => {
                console.error("Error fetching rentals:", error);
            });
    }, []);

    return (
        <div>
            <h1>Rentals</h1>
            {rentals.length === 0 ? (
                <p>No rentals available</p>
            ) : (
                <ul>
                    {rentals.map((rental) => (
                        <li key={rental.id}>
                            <p>Customer ID: {rental.customerId}</p>
                            <p>Rental Date: {rental.rentalDate}</p>
                            <p>Total Cost: {rental.totalCost}</p>
                            <h3>Rental Items:</h3>
                            <ul>
                                {rental.rentalItems.map((item, index) => (
                                    <li key={index}>
                                        <p>Product ID: {item.productId}</p>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Price: {item.price}</p>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default RentalList;
