import React, {useEffect, useState} from 'react';
import axios from 'axios';
import RegisterCustomerForm from "@/components/RegisterCustomerForm.jsx";

const Customers = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8083/customers')
            .then(response => setCustomers(response.data))
            .catch(error => console.error('Error fetching customers:', error));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 space-y-6">
            <h1 className="text-3xl font-bold mb-6">Customers</h1>
            <RegisterCustomerForm />
            <div className="bg-white shadow-lg rounded-lg p-6">
                <ul>
                {customers.map(customer => (
                        <li key={customer.id}>
                            Name: {customer.name}, Email: {customer.email}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Customers;
