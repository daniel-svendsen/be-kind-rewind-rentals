import React, {useState} from 'react';
import axios from "axios";

function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [city, setCity] = useState('');

    const handleSubmit = (event) => {
        //event.preventDefault();

        const data = {
            name: name,
            email: email,
            phone: phone,
            address: {
                street: street,
                zipCode: zipcode,
                city: city
            }
        }
        axios
            .post('http://localhost:8083/customers', data)
            .then((response) => {
                console.log("Customer created successfully:", response.data);
            })
            .catch((error) => {
                console.error("There was an error creating the customer:", error);
            });
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-center">Register</h2>
            <form onSubmit={handleSubmit} className="max-w-md w-full bg-base-300 rounded p-6 space-y-4">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="p-4 border rounded-lg text-left transition-all bg-gray-100 hover"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="p-4 border rounded-lg text-left transition-all bg-gray-100 hover"
                />
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
                    className="p-4 border rounded-lg text-left transition-all bg-gray-100 hover"
                />
                <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="Street"
                    className="p-4 border rounded-lg text-left transition-all bg-gray-100 hover"
                />
                <input
                    type="text"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    placeholder="Zipcode"
                    className="p-4 border rounded-lg text-left transition-all bg-gray-100 hover"
                />
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="p-4 border rounded-lg text-left transition-all bg-gray-100 hover"
                />
                <div className="flex">
                    <input type="submit"
                           value="Register"
                           className={`btn btn-primary px-6 py-3 rounded-lg text-lg font-semibold transition-all ${
                               name && email && phone && street && zipcode && city
                                   ? "bg-green-500 text-white hover:bg-green-600"
                                   : "bg-gray-300 text-gray-500 cursor-not-allowed"
                           }`} disabled={!name || !email || !phone || !street || !zipcode || !city}/>
                </div>
            </form>
        </div>
    );
}

export default RegisterForm;
