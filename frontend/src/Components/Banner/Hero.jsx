import React from 'react';
import gulshan from '../../assets/gulshan.png'

const Hero = () => {
    return (
        <div className='bg-[#F5F5F5]'>
            <div className='max-w-11/12 mx-auto'>
                <section className="text-center pt-16 px-6">
                    {/* Heading */}
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        {" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-[#8A63F8] to-[#A87CFA]">
                            Simplifying
                        </span>{" "}
                        Real Estate
                    </h1>

                    {/* Subtext */}
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        At <span className="font-semibold">Nexaur AI</span>, we go beyond property transactions. We combine real estate technology, trust, and transparency to help you confidently find your next home or investment property.
                    </p>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-10 font-medium">
                        You don't just buy property here, you own what's next!
                    </p>
                </section>
                <div className='mx-auto'>
                    <img src={gulshan} alt="" className='max-w-full m-auto' />
                </div>
            </div>
        </div>
    );
};

export default Hero;