    import React, { useState } from 'react';
    import { Link } from 'react-router-dom';

    const CreateSpace = () => {
    const [spaceName, setSpaceName] = useState('');
    const [location, setLocation] = useState('');
    const [capacity, setCapacity] = useState('');
    const [amenities, setAmenities] = useState('');
    const [rate, setRate] = useState('');
    const [image, setImage] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!spaceName) {
        newErrors.spaceName = 'Space name is required';
        }
        if (!location) {
        newErrors.location = 'Location is required';
        }
        if (!capacity) {
        newErrors.capacity = 'Capacity is required';
        }
        if (!amenities) {
        newErrors.amenities = 'Amenities are required';
        }
        if (!rate) {
        newErrors.rate = 'Rate is required';
        }

        if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        } else {
        setSubmitted(true);
        // Add logic to handle form submission, e.g., sending data to a server
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full mx-4 sm:mx-6 lg:mx-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Create a Space</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
                Image
                </label>
                <input
                type="file"
                id="image"
                onChange={handleImageChange}
                className="relative w-full"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="spaceName" className="block text-gray-700 text-sm font-bold mb-2">
                Space Name
                </label>
                <input
                type="text"
                id="spaceName"
                value={spaceName}
                onChange={(e) => setSpaceName(e.target.value)}
                placeholder="Enter space name"
                className={`px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full transform hover:scale-105 transition-transform ${
                    errors.spaceName ? 'border-red-500' : ''
                }`}
                />
                {errors.spaceName && <p className="text-red-500 text-xs mt-1">{errors.spaceName}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
                Location
                </label>
                <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
                className={`px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full transform hover:scale-105 transition-transform ${
                    errors.location ? 'border-red-500' : ''
                }`}
                />
                {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="capacity" className="block text-gray-700 text-sm font-bold mb-2">
                Capacity
                </label>
                <input
                type="text"
                id="capacity"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="Enter capacity"
                className={`px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full transform hover:scale-105 transition-transform ${
                    errors.capacity ? 'border-red-500' : ''
                }`}
                />
                {errors.capacity && <p className="text-red-500 text-xs mt-1">{errors.capacity}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="amenities" className="block text-gray-700 text-sm font-bold mb-2">
                Amenities
                </label>
                <textarea
                id="amenities"
                value={amenities}
                onChange={(e) => setAmenities(e.target.value)}
                placeholder="Enter amenities"
                className={`px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full transform hover:scale-105 transition-transform ${
                    errors.amenities ? 'border-red-500' : ''
                }`}
                ></textarea>
                {errors.amenities && <p className="text-red-500 text-xs mt-1">{errors.amenities}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="rate" className="block text-gray-700 text-sm font-bold mb-2">
                Rate (per hour)
                </label>
                <input
                type="text"
                id="rate"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="Enter rate"
                className={`px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full transform hover:scale-105 transition-transform ${
                    errors.rate ? 'border-red-500' : ''
                }`}
                />
                {errors.rate && <p className="text-red-500 text-xs mt-1">{errors.rate}</p>}
            </div>
            <div className="col-span-2 text-center">
                <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                Submit
                </button>
            </div>
            </form>
            {submitted && (
            <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                Space created successfully!
            </div>
            )}
            <p className="text-gray-600 text-md text-center mt-4">
            Go back to <Link to="/dashboard" className="text-blue-500">Dashboard</Link>
            </p>
        </div>
        </div>
    );
    };

    export default CreateSpace;
