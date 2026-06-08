import Link from 'next/link';
import React from 'react';

const LatestRooms = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/latest`, { cache: 'no-store' });
    const rooms = await res.json();

    return (
        <section className="py-20 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-14">
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-500">Available now</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
                        Latest study rooms
                    </h2>
                    <p className="text-gray-500 mt-3 text-base max-w-xl mx-auto">
                        Browse our most recently added rooms and find your perfect study spot.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rooms.map((room) => (
                        <div
                            key={room._id}
                            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col h-full"
                        >
                            {/* Image */}
                            <div className="relative w-full overflow-hidden bg-gray-100" style={{ aspectRatio: '16/9' }}>
                                <img
                                    src={room.image || "https://images.unsplash.com/photo-1497366216548-37526070297c"}
                                    alt={room.roomName}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                                    {room.floor || 'N/A'}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-5 flex flex-col flex-grow">

                                {/* Title & Rate */}
                                <div className="flex justify-between items-start gap-2 mb-2">
                                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                        {room.roomName || 'Unnamed Room'}
                                    </h3>
                                    <div className="flex flex-col items-end shrink-0">
                                        <span className="text-lg font-extrabold text-blue-600">${room.hourlyRate}</span>
                                        <span className="text-xs text-gray-400 font-medium">/ hour</span>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-500 text-sm mb-4 flex-grow" style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}>
                                    {room.description || 'No description provided.'}
                                </p>

                                {/* Capacity */}
                                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100 text-sm text-gray-600 font-medium">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                    </svg>
                                    <span>Up to <span className="text-gray-900 font-semibold">{room.capacity || 1}</span> people</span>
                                </div>

                                {/* Amenities */}
                                <div className="flex flex-wrap gap-1.5 mb-5">
                                    {(room.amenities || []).slice(0, 3).map((amenity, idx) => (
                                        <span key={idx} className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-md">
                                            {amenity}
                                        </span>
                                    ))}
                                    {(room.amenities || []).length > 3 && (
                                        <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-md">
                                            +{room.amenities.length - 3} more
                                        </span>
                                    )}
                                </div>

                                {/* Button */}
                                <Link href={`/rooms/${room._id}`}>
                                    <button className="w-full bg-gray-50 hover:bg-blue-600 text-gray-700 hover:text-white font-semibold py-2.5 px-4 rounded-xl transition-colors duration-200 mt-auto text-sm">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* See All */}
                <div className="text-center mt-12">
                    <Link href="/rooms">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-2xl transition-colors">
                            See All Rooms
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LatestRooms;