import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Customers = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8082/customers')
            .then(response => setCustomers(response.data))
            .catch(error => console.error('Error fetching customers:', error));
    }, []);

    return (
        <div>
            <h2>Customers</h2>
            <ul>
                {customers.map(customer => (
                    <li key={customer.id}>
                        Name: {customer.name}, Email: {customer.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Customers;
