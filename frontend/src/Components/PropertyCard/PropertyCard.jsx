import React from 'react';

const statusColorMap = {
    completed: 'bg-gradient-to-br from-emerald-500 to-emerald-600 border-emerald-400/50',
    ongoing: 'bg-gradient-to-br from-blue-600 to-indigo-600 border-blue-400/50',
    upcoming: 'bg-gradient-to-br from-amber-500 to-orange-500 border-amber-400/50'
};

const PropertyCard = ({ prop }) => {
    const {
        companyName,
        propertyName,
        location,
        photoUrl,
        projectType,
        presentStatus,
        totalApartments,
        apartmentSize,
        numFloors,
        landSize
    } = prop;

    const safeImg = photoUrl && photoUrl.startsWith('http')
        ? photoUrl
        : 'https://images.unsplash.com/photo-1502003148287-a82ef80a6abc?auto=format&fit=crop&w=800&q=60';

    const statusClass = statusColorMap[presentStatus] || 'bg-gradient-to-br from-slate-500 to-slate-600 border-slate-400/50';

    return (
        <div className="group relative flex flex-col rounded-2xl border border-slate-200/80 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] hover:border-slate-300/80 hover:-translate-y-2 backdrop-blur-sm">
            {/* Premium Gold Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Image / Media */}
            <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                <img
                    src={safeImg}
                    alt={propertyName || 'Property'}
                    className="h-full w-full object-cover object-center transition-all duration-700 group-hover:scale-110 group-hover:brightness-105"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/800x500?text=No+Image'; }}
                    loading="lazy"
                />
                {/* Premium Gradient Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-slate-900/20"></div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-slate-900/30"></div>
                
                {/* Status & Type Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2.5">
                    <span className={`px-3.5 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase text-white border shadow-lg backdrop-blur-md ${statusClass}`}>
                        {presentStatus}
                    </span>
                    <span className="px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase bg-white/95 text-slate-800 backdrop-blur-md border border-white/80 shadow-md">
                        {projectType}
                    </span>
                </div>

                {/* Location Badge */}
                <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1.5 bg-slate-900/75 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-amber-400">
                            <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
                        </svg>
                        <span className="text-white text-xs font-semibold">{location}</span>
                    </div>
                </div>
                
                {/* Property Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-slate-900 via-slate-900/95 to-transparent">
                    <div className="space-y-2">
                        <div className="flex items-start justify-between gap-3">
                            <h2 className="text-white text-xl font-bold leading-tight drop-shadow-lg line-clamp-2 flex-1">
                                {propertyName}
                            </h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-amber-400"></div>
                            <p className="text-slate-200 text-sm font-medium line-clamp-1">{companyName}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details Section */}
            <div className="p-6 flex flex-col gap-5 grow bg-gradient-to-br from-slate-50/50 to-white">
                {/* Specifications Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <Metric 
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M4.25 2A2.25 2.25 0 0 0 2 4.25v11.5A2.25 2.25 0 0 0 4.25 18h11.5A2.25 2.25 0 0 0 18 15.75V4.25A2.25 2.25 0 0 0 15.75 2H4.25ZM6 13.25a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75Zm.75-6.5a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5ZM6 10a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 6 10Z" clipRule="evenodd" />
                            </svg>
                        }
                        label="Floors" 
                        value={numFloors} 
                    />
                    <Metric 
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path d="M10.75 10.818v2.614A3.13 3.13 0 0 0 11.888 13c.482-.315.612-.648.612-.875 0-.227-.13-.56-.612-.875a3.13 3.13 0 0 0-1.138-.432ZM8.33 8.62c.053.055.115.11.184.164.208.16.46.284.736.363V6.603a2.45 2.45 0 0 0-.35.13c-.14.065-.27.143-.386.233-.377.292-.514.627-.514.909 0 .184.058.39.202.592.037.051.08.102.128.152Z" />
                                <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-6a.75.75 0 0 1 .75.75v.316a3.78 3.78 0 0 1 1.653.713c.426.33.744.74.925 1.2a.75.75 0 0 1-1.395.55 1.35 1.35 0 0 0-.447-.563 2.187 2.187 0 0 0-.736-.363V9.3c.698.093 1.383.32 1.959.696.787.514 1.29 1.27 1.29 2.13 0 .86-.504 1.616-1.29 2.13-.576.377-1.261.603-1.96.696v.299a.75.75 0 1 1-1.5 0v-.3c-.697-.092-1.382-.318-1.958-.695-.482-.315-.857-.717-1.078-1.188a.75.75 0 1 1 1.359-.636c.08.173.245.376.54.569.313.205.706.353 1.138.432v-2.748a3.782 3.782 0 0 1-1.653-.713C6.9 9.433 6.5 8.681 6.5 7.875c0-.805.4-1.558 1.097-2.096a3.78 3.78 0 0 1 1.653-.713V4.75A.75.75 0 0 1 10 4Z" clipRule="evenodd" />
                            </svg>
                        }
                        label="Total Units" 
                        value={totalApartments} 
                    />
                    <Metric 
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M.99 5.24A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25l.01 9.5A2.25 2.25 0 0 1 16.76 17H3.26A2.267 2.267 0 0 1 1 14.74l-.01-9.5Zm8.26 9.52v-.625a.75.75 0 0 0-.75-.75H3.25a.75.75 0 0 0-.75.75v.615c0 .414.336.75.75.75h5.373a.75.75 0 0 0 .627-.74Zm1.5 0a.75.75 0 0 0 .627.74h5.373a.75.75 0 0 0 .75-.75v-.615a.75.75 0 0 0-.75-.75H11.5a.75.75 0 0 0-.75.75v.625Zm6.75-3.63v-.625a.75.75 0 0 0-.75-.75H11.5a.75.75 0 0 0-.75.75v.625c0 .414.336.75.75.75h5.25a.75.75 0 0 0 .75-.75Zm-8.25 0v-.625a.75.75 0 0 0-.75-.75H3.25a.75.75 0 0 0-.75.75v.625c0 .414.336.75.75.75H8.5a.75.75 0 0 0 .75-.75ZM17.5 7.5v-.625a.75.75 0 0 0-.75-.75H11.5a.75.75 0 0 0-.75.75V7.5c0 .414.336.75.75.75h5.25a.75.75 0 0 0 .75-.75Zm-8.25 0v-.625a.75.75 0 0 0-.75-.75H3.25a.75.75 0 0 0-.75.75V7.5c0 .414.336.75.75.75H8.5a.75.75 0 0 0 .75-.75Z" clipRule="evenodd" />
                            </svg>
                        }
                        label="Unit Size" 
                        value={`${apartmentSize} sft`} 
                    />
                    <Metric 
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
                            </svg>
                        }
                        label="Land Area" 
                        value={`${landSize} katha`} 
                    />
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200/60"></div>

                {/* Footer Actions */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500"></div>
                        <span className="text-[11px] uppercase tracking-widest font-bold text-slate-400">
                            ID: {String(prop?._id || '').slice(-6) || 'N/A'}
                        </span>
                    </div>
                    <button
                        className="group/btn relative inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-slate-900 focus:outline-none px-4 py-2.5 rounded-lg bg-gradient-to-r from-slate-100 to-slate-50 hover:from-amber-50 hover:to-yellow-50 border border-slate-200 hover:border-amber-300 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden"
                        type="button"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/10 to-amber-400/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></span>
                        <span className="relative">View Details</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="relative w-4 h-4 transition-transform group-hover/btn:translate-x-1">
                            <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
    );
};

const Metric = ({ icon, label, value }) => (
    <div className="group/metric relative flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-3.5 hover:border-amber-300/60 hover:bg-gradient-to-br hover:from-amber-50/30 hover:to-white transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden">
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover/metric:translate-x-[100%] transition-transform duration-700"></div>
        
        <div className="relative flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-600 group-hover/metric:from-amber-100 group-hover/metric:to-amber-50 group-hover/metric:text-amber-600 group-hover/metric:border-amber-200 transition-all duration-300">
            {icon}
        </div>
        <div className="relative flex flex-col min-w-0 flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover/metric:text-amber-600 transition-colors duration-300">
                {label}
            </span>
            <span className="text-slate-900 text-base font-bold mt-0.5 truncate">
                {value ?? '—'}
            </span>
        </div>
    </div>
);

export default PropertyCard;