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

    const [selectedCustomer, setSelectedCustomer] = useState(null); // Store selected customer
    const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: { street: "", city: "", zipCode: "" },
    });

    const handleUpdateCustomer = (customer) => {
        setSelectedCustomer(customer);
        setFormData({
            name: customer.name || "",
            email: customer.email || "",
            phone: customer.phone || "",
            address: {
                street: customer.address?.street || "",
                city: customer.address?.city || "",
                zipCode: customer.address?.zipCode || "",
            },
        });
        setIsModalOpen(true);
    };

    // Close modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCustomer(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name.includes("address.")) {
            const field = name.split(".")[1]; // Extract 'street', 'city', or 'zipCode'
            setFormData((prev) => ({
                ...prev,
                address: {
                    ...prev.address,
                    [field]: value, // Update nested address field
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value, // Update top-level fields
            }));
        }
    };

    // Save changes
    const handleSaveChanges = () => {
        const updatedCustomer = {
            id: selectedCustomer.id,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: {
                id: selectedCustomer.address.id,
                street: formData.address.street,
                city: formData.address.city,
                zipCode: formData.address.zipCode,
            },
        };

        axios
            .put(`http://localhost:8083/customers/${selectedCustomer.id}`, updatedCustomer)
            .then((response) => {
                console.log("Customer updated successfully:", response.data);
                setCustomers((prev) =>
                    prev.map((customer) =>
                        customer.id === selectedCustomer.id ? { ...customer, ...updatedCustomer } : customer
                    )
                );
            })
            .catch((error) => {
                console.error("There was an error updating the customer:", error);
            });

        handleCloseModal();
    };

    const handleDeleteCustomer = (id) => {
        axios.delete(`http://localhost:8083/customers/${id}`)
            .then(() => {
                setCustomers((prev) => prev.filter((customer) => customer.id !== id));
                console.log("Customer deleted successfully.");
            })
            .catch((error) => {
                console.error("Error deleting customer:", error);
            });
    };


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 space-y-6">
            <h1 className="text-3xl font-bold mb-6">Customers</h1>
            <RegisterCustomerForm />
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-center">Update</h2>
                <ul>
                    {customers.map((customer) => (
                        <li key={customer.id} className="flex justify-between items-center">
                            <button
                                value={customer.id.toString()}
                                className={"mb-4 p-4 border rounded-lg text-left transition-all bg-gray-100 hover w-[200px]"}
                                onClick={() => handleUpdateCustomer(customer)} // Pass customer explicitly
                            >
                                {customer.name}
                            </button>
                            <button
                                onClick={() => handleDeleteCustomer(customer.id)}
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
                                    <label className="block text-sm font-medium mb-1" htmlFor="name">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1" htmlFor="phone">
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-500"
                                    />
                                </div>
                                <h3 className="text-lg font-semibold mt-4">Address</h3>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1" htmlFor="street">
                                        Street
                                    </label>
                                    <input
                                        type="text"
                                        id="street"
                                        name="address.street"
                                        value={formData.address.street}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1" htmlFor="zipCode">
                                        Zip Code
                                    </label>
                                    <input
                                        type="text"
                                        id="zipCode"
                                        name="address.zipCode"
                                        value={formData.address.zipCode}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1" htmlFor="city">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="address.city"
                                        value={formData.address.city}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-500"
                                    />
                                </div>

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
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Customers;
