import React from 'react';
import corpoImage from '../../assets/corpo.jpg';
import womanImage from '../../assets/woman.jpg';

const Review = () => {
    return (
        <section className="relative py-20 lg:py-32 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={corpoImage}
                    alt="Modern Interior"
                    className="w-full h-full object-cover"
                />
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-linear-to-br from-slate-900/85 via-slate-900/80 to-slate-800/85"></div>
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAgNGgtMnYyaDJ2LTJ6bS0yLTJ2Mmg0di0yaC00em0yLTRoMnYtMmgtMnYyem0tMiAwdi0yaDJ2MmgtMnptMi00aDJ2LTJoLTJ2MnptLTQgMHYyaDJ2LTJoLTJ6bTIgMmgydi0yaC0ydjJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Testimonial Card */}
                <div className="relative bg-white rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.3)] overflow-visible backdrop-blur-sm">
                    {/* Quote Icon - Top Center (Outside the card) */}
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                        <div className="w-16 h-16 bg-linear-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-xl flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-8 h-8 text-white"
                            >
                                <path d="M3.691 6.292C5.094 4.771 7.217 4 10 4h1v2.819l-.804.161c-1.37.274-2.323.813-2.833 1.604A2.902 2.902 0 0 0 6.925 10H10a1 1 0 0 1 1 1v7c0 1.103-.897 2-2 2H3a1 1 0 0 1-1-1v-5l.003-2.919c-.009-.111-.199-2.741 1.688-4.789zM20 20h-6a1 1 0 0 1-1-1v-5l.003-2.919c-.009-.111-.199-2.741 1.688-4.789C16.094 4.771 18.217 4 21 4h1v2.819l-.804.161c-1.37.274-2.323.813-2.833 1.604A2.902 2.902 0 0 0 17.925 10H21a1 1 0 0 1 1 1v7c0 1.103-.897 2-2 2z" />
                            </svg>
                        </div>
                    </div>

                    {/* Testimonial Content */}
                    <div className="pt-16 pb-12 px-8 sm:px-12 lg:px-16">
                        {/* Review Text */}
                        <div className="text-center mb-8">
                            <p className="text-slate-800 text-lg sm:text-xl lg:text-2xl leading-relaxed font-medium max-w-3xl mx-auto">
                                " I'm always short on time, but Nexaur made property buying so simple and clear. Finally felt stress free and fully confident. "
                            </p>
                        </div>

                        {/* Reviewer Info */}
                        <div className="flex flex-col items-center gap-4">
                            {/* Profile Image */}
                            <div className="relative">
                                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-slate-100 shadow-lg">
                                    <img
                                        src={womanImage}
                                        alt="Tahmina Ferdous"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {/* Verified Badge */}
                                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-linear-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-white">
                                        <path fillRule="evenodd" d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>

                            {/* Name and Role */}
                            <div className="text-center">
                                <h3 className="text-slate-900 text-lg font-bold">
                                    Tahmina Ferdous
                                </h3>
                                <p className="text-slate-600 text-sm font-medium mt-1">
                                    Businesswoman
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Corner Elements */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-linear-to-br from-amber-400/10 to-transparent rounded-br-full"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-linear-to-tl from-blue-400/10 to-transparent rounded-tl-full"></div>
                </div>
            </div>
        </section>
    );
};

export default Review;