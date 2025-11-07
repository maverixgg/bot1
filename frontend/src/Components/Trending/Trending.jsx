import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PropertyCard from '../PropertyCard/PropertyCard';
import { Star, Home, ArrowRight } from 'lucide-react';

const Trending = () => {

    const [trend, setTrend] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrend = async () => {
            try {
                const response = await axios.get("http://localhost:8000/properties");
                console.log('Trending properties loaded:', response.data.properties);
                setTrend(response.data.properties || []);
                setLoading(false);
            }
            catch (e) {
                console.log('Error loading trending properties:', e);
                setLoading(false);
            }
        };
        fetchTrend();
    }, []);

    if (loading) {
        return (
            <div className='py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50'>
                <div className='text-center'>
                    <div className='inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin'></div>
                    <p className='text-slate-600 font-semibold mt-4'>Loading trending properties...</p>
                </div>
            </div>
        );
    }

    return (
        <section className='py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden'>
            {/* Decorative Background Elements */}
            <div className='absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-3xl'></div>
            <div className='absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-amber-500/5 to-transparent rounded-full blur-3xl'></div>
            
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
                {/* Section Header */}
                <div className='text-center mb-12'>
                    <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 mb-4'>
                        <Star className='w-4 h-4 text-blue-600' fill='currentColor' />
                        <span className='text-blue-700 text-sm font-bold uppercase tracking-wide'>Featured Investments</span>
                    </div>
                    
                    <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4'>
                        Invest in <span className='bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>Trending Properties</span>
                    </h2>
                    <p className='text-slate-600 text-lg max-w-2xl mx-auto'>
                        Discover the most sought-after fractional investment opportunities in prime locations
                    </p>
                </div>

                {/* Properties Grid */}
                {trend.length === 0 ? (
                    <div className='text-center py-16'>
                        <div className='inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 mb-6 shadow-lg'>
                            <Home className='w-10 h-10 text-slate-400' />
                        </div>
                        <h3 className='text-xl font-bold text-slate-900 mb-2'>No Properties Available</h3>
                        <p className='text-slate-600'>Check back soon for exciting investment opportunities!</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {trend.map(prop => (
                            <PropertyCard prop={prop} key={prop._id} />
                        ))}
                    </div>
                )}

                {/* View All Button */}
                {trend.length > 0 && (
                    <div className='text-center mt-12'>
                        <a 
                            href='/properties'
                            className='inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1'
                        >
                            <span>Explore All Properties</span>
                            <ArrowRight className='w-5 h-5' />
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Trending;