import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Properties = () => {

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('http://localhost:8000/properties');
                console.log('Response from backend:', response.data); // Log the full response
                console.log('Properties array:', response.data.properties); // Log just the properties
                setProperties(response.data.properties);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching properties:', error);
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    if (loading) return <div className='text-center p-20'>Loading...</div>;

    return (
        <div className='bg-[#F5F5F5]'>
            <div className='max-w-11/12 mx-auto'>
                <h1 className='text-center text-3xl font-bold p-20'>All Properties</h1>
                {
                    properties.map(prop => console.log(prop))
                }
            </div>
        </div>
    );
};

export default Properties;