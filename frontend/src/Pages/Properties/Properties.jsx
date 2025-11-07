import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react';
import PropertyCard from '../../Components/PropertyCard/PropertyCard';
import API_BASE_URL from '../../config/api';

const Properties = () => {

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [locationFilter, setLocationFilter] = useState('');

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/properties`);
                setProperties(response.data.properties || []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching properties:', error);
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    // Filter properties by location
    const filteredProperties = useMemo(() => {
        if (!locationFilter.trim()) return properties;
        
        return properties.filter(prop => 
            prop.location?.toLowerCase().includes(locationFilter.toLowerCase())
        );
    }, [properties, locationFilter]);

    // Get unique locations for suggestions
    const uniqueLocations = useMemo(() => {
        const locations = properties
            .map(prop => prop.location)
            .filter(Boolean);
        return [...new Set(locations)].sort();
    }, [properties]);

    if (loading) return <div className='text-center p-20'>Loading...</div>;

    return (
        <div className='bg-[#F5F5F5] min-h-screen'>
            <div className='max-w-7xl mx-auto px-4 py-8'>
                <h1 className='text-center text-4xl font-bold mb-8 text-gray-900'>
                    Available Properties
                </h1>
                
                {/* Location Filter */}
                <div className='max-w-2xl mx-auto mb-10'>
                    <div className='relative group'>
                        <div className='absolute inset-y-0 left-4 flex items-center pointer-events-none'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className='w-5 h-5 text-slate-400 group-focus-within:text-amber-500 transition-colors duration-300'>
                                <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search by location (e.g., Dhaka, Gulshan, Banani...)"
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                            className='w-full pl-12 pr-12 py-4 rounded-xl border-2 border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all duration-300 shadow-sm hover:shadow-md font-medium'
                        />
                        
                        {locationFilter && (
                            <button
                                onClick={() => setLocationFilter('')}
                                className='absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors'
                                aria-label="Clear filter"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className='w-5 h-5'>
                                    <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                                </svg>
                            </button>
                        )}
                    </div>
                    
                    {/* Filter Stats & Quick Filters */}
                    <div className='mt-4 flex items-center justify-between'>
                        <div className='text-sm text-slate-600'>
                            {locationFilter ? (
                                <span className='font-semibold'>
                                    {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
                                    {locationFilter && <span className='text-amber-600'> in "{locationFilter}"</span>}
                                </span>
                            ) : (
                                <span className='font-medium'>
                                    Showing all {properties.length} {properties.length === 1 ? 'property' : 'properties'}
                                </span>
                            )}
                        </div>
                        
                        {/* Quick Location Filters */}
                        {uniqueLocations.length > 0 && !locationFilter && (
                            <div className='flex items-center gap-2 flex-wrap justify-end'>
                                <span className='text-xs text-slate-500 font-semibold uppercase tracking-wide'>Quick filters:</span>
                                {uniqueLocations.slice(0, 4).map(location => (
                                    <button
                                        key={location}
                                        onClick={() => setLocationFilter(location)}
                                        className='px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 transition-all duration-300 shadow-sm hover:shadow'
                                    >
                                        {location}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                
                {filteredProperties.length === 0 ? (
                    <div className='text-center py-16'>
                        <div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 mb-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='w-10 h-10 text-slate-400'>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                            </svg>
                        </div>
                        <p className='text-xl font-semibold text-slate-700 mb-2'>
                            {locationFilter ? 'No properties found' : 'No properties available yet'}
                        </p>
                        <p className='text-slate-500'>
                            {locationFilter ? (
                                <>
                                    Try adjusting your search or{' '}
                                    <button 
                                        onClick={() => setLocationFilter('')}
                                        className='text-amber-600 hover:text-amber-700 font-semibold underline'
                                    >
                                        clear the filter
                                    </button>
                                </>
                            ) : (
                                'Check back later for new listings'
                            )}
                        </p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {filteredProperties.map(prop => (
                            <PropertyCard key={prop._id} prop={prop} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Properties;