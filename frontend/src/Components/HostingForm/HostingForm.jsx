import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:8000'

const HostingForm = () => {
    // We use a single state object to hold all form data.
    // Initial values are pre-filled based on your image.
    const [formData, setFormData] = useState({
        companyName: '',
        propertyName: '',
        location: '',
        photoUrl: '',
        projectType: 'Residential',
        totalApartments: 10,
        apartmentSize: 4200,
        presentStatus: 'ongoing',
        numFloors: 10,
        landSize: 9.85,
    });

    // A single handler to update the state for any input
    const handleChange = (e) => {
        const { name, value, type, valueAsNumber } = e.target;
        const parsedValue = type === 'number' ? (Number.isNaN(valueAsNumber) ? '' : valueAsNumber) : value;
        setFormData((prevData) => ({
            ...prevData,
            [name]: parsedValue,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Coerce numeric fields to numbers on the payload side
            const payload = {
                ...formData,
                totalApartments: Number(formData.totalApartments) || 0,
                apartmentSize: Number(formData.apartmentSize) || 0,
                numFloors: Number(formData.numFloors) || 0,
                landSize: Number(formData.landSize) || 0,
            };

            console.log('Form data submitted:', payload);
            const res = await axios.post(`${API_URL}/host`, payload);

            console.log('Property added successfully:', res.data);
            toast.success('✅ Congratulations! Your property has been listed successfully.');

            // Reset form to initial values
            setFormData({
                companyName: '',
                propertyName: '',
                location: '',
                photoUrl: '',
                projectType: 'Residential',
                totalApartments: 10,
                apartmentSize: 4200,
                presentStatus: 'ongoing',
                numFloors: 10,
                landSize: 9.85,
            });
        } catch (err) {
            console.error('Failed to add property', err);
            toast.error('❌ Failed to add property. Please try again.');
        }
    };

    // Base classes for form inputs
    const inputBaseClass =
        'w-full p-3 border border-gray-300 rounded-md shadow-sm text-base text-gray-900 placeholder-gray-400 transition ' +
        'focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100';

    return (
        // This is the main body content for your outlet
        <main className="flex justify-center items-start w-full py-12 px-4 bg-gray-50">
            {/* This is the main form card.
        - w-full: Full width on mobile
        - max-w-3xl: Max width on larger screens (896px)
        - p-6 sm:p-10: Responsive padding
        - rounded-xl: 12px border radius
      */}
            <form
                className="w-full max-w-3xl bg-white rounded-xl p-6 sm:p-10 shadow-md"
                onSubmit={handleSubmit}
            >
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 text-center mb-8">
                    Host New Property
                </h1>

                {/* Main form grid
          - grid-cols-1: 1 column on mobile (default)
          - sm:grid-cols-2: 2 columns on small screens and up
          - gap-6: 1.5rem gap
        */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Company Name - Spans 2 columns */}
                    <div className="flex flex-col col-span-1 sm:col-span-2">
                        <label
                            htmlFor="companyName"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Company Name
                        </label>
                        <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            placeholder="e.g., ABC Developers Ltd."
                            className={inputBaseClass}
                            required
                        />
                    </div>

                    {/* Property Name - Spans 2 columns */}
                    <div className="flex flex-col col-span-1 sm:col-span-2">
                        <label
                            htmlFor="propertyName"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Property Name
                        </label>
                        <input
                            type="text"
                            id="propertyName"
                            name="propertyName"
                            value={formData.propertyName}
                            onChange={handleChange}
                            placeholder="e.g., Sunrise Residency"
                            className={inputBaseClass}
                            required
                        />
                    </div>

                    {/* Location - Spans 2 columns */}
                    <div className="flex flex-col col-span-1 sm:col-span-2">
                        <label
                            htmlFor="location"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="e.g., Dhaka, Gulshan"
                            className={inputBaseClass}
                            required
                        />
                    </div>

                    {/* Photo URL - Spans 2 columns */}
                    <div className="flex flex-col col-span-1 sm:col-span-2">
                        <label
                            htmlFor="photoUrl"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Property Photo URL
                        </label>
                        <input
                            type="url"
                            id="photoUrl"
                            name="photoUrl"
                            value={formData.photoUrl}
                            onChange={handleChange}
                            placeholder="https://example.com/property-image.jpg"
                            className={inputBaseClass}
                            required
                        />
                    </div>

                    {/* Project Type */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="projectType"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Project Type
                        </label>
                        <select
                            id="projectType"
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleChange}
                            className={inputBaseClass}

                        >
                            <option value="Residential">Residential</option>
                            <option value="Commercial">Commercial</option>
                            <option value="Mixed-Use">Mixed-Use</option>
                        </select>
                    </div>

                    {/* Present Status */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="presentStatus"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Present Status
                        </label>
                        <select
                            id="presentStatus"
                            name="presentStatus"
                            value={formData.presentStatus}
                            onChange={handleChange}
                            className={inputBaseClass}
                        >
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                            <option value="upcoming">Upcoming</option>
                        </select>
                    </div>

                    {/* Total Apartments */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="totalApartments"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Total Apartments
                        </label>
                        <input
                            type="number"
                            id="totalApartments"
                            name="totalApartments"
                            value={formData.totalApartments}
                            onChange={handleChange}
                            placeholder="e.g., 10"
                            className={inputBaseClass}
                            required
                        />
                    </div>

                    {/* Number of Floors */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="numFloors"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Number Of Floors
                        </label>
                        <input
                            type="number"
                            id="numFloors"
                            name="numFloors"
                            value={formData.numFloors}
                            onChange={handleChange}
                            placeholder="e.g., 10"
                            className={inputBaseClass}
                            required
                        />
                    </div>

                    {/* Apartment Size (Range) - Spans 2 columns */}
                    <div className="flex flex-col col-span-1 sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Apartment Size (sft)
                        </label>
                        <div className="flex items-center gap-3">
                            <input
                                type="number"
                                name="apartmentSize"
                                value={formData.apartmentSize}
                                onChange={handleChange}
                                placeholder="Min Size"
                                className={inputBaseClass}
                                required
                            />
                        </div>
                    </div>

                    {/* Basements field removed per request */}

                    {/* Land Size - Spans 2 columns */}
                    <div className="flex flex-col col-span-1 sm:col-span-2">
                        <label
                            htmlFor="landSize"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Land Size
                        </label>
                        <div className="flex items-center gap-3">
                            <input
                                type="number"
                                step="0.5"
                                id="landSize"
                                name="landSize"
                                onChange={handleChange}
                                placeholder="e.g., 9.85 katha"
                                className={`${inputBaseClass} flex-1`}
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button - Spans 2 columns */}
                    <button
                        type="submit"
                        className="col-span-1 sm:col-span-2 py-3 mt-4 text-base font-semibold text-white bg-blue-600 rounded-md transition
                       hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Add Property
                    </button>
                </div>
            </form>
        </main>
    );
};

export default HostingForm;