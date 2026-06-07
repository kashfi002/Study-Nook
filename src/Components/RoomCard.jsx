"use client"
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
const RoomCard = ({ room }) => {
    const { 
        _id,
        roomName, 
        description, 
        image, 
        floor, 
        capacity, 
        hourlyRate, 
        amenities = [] 
    } = room;
    const { data: session, } = authClient.useSession() 
       const user = session?.user
       const router = useRouter();

    const handleBooking = () => {
        if (!user) {
            router.push('/login');
        } else {
            router.push(`/rooms/${_id}`);
        }
    }
    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col h-full">
            
            {/* Image Section */}
            <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                <img 
                    src={image || "https://images.unsplash.com/photo-1497366216548-37526070297c"} 
                    alt={roomName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Floor Badge */}
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                    {floor || 'N/A'}
                </span>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-grow">
                
                {/* Title & Price Header */}
                <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="text-xl font-bold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {roomName || 'Unnamed Room'}
                    </h3>
                    <div className="flex flex-col items-end shrink-0">
                        <span className="text-xl font-extrabold text-blue-600">${hourlyRate}</span>
                        <span className="text-xs text-gray-400 font-medium">/ hour</span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">
                    {description || 'No description provided for this workspace.'}
                </p>

                {/* Capacity Meta Info */}
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100 text-sm text-gray-600 font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                    </svg>
                    <span>Up to <span className="text-gray-900 font-semibold">{capacity || 1}</span> people</span>
                </div>

                {/* Amenities Badges */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                    {amenities.slice(0, 3).map((amenity, idx) => (
                        <span 
                            key={idx} 
                            className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-md"
                        >
                            {amenity}
                        </span>
                    ))}
                    {amenities.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-md">
                            +{amenities.length - 3} more
                        </span>
                    )}
                </div>

                <button
            onClick={handleBooking}
            className="w-full bg-gray-50 hover:bg-blue-600 text-gray-700 hover:text-white font-semibold py-2.5 px-4 rounded-xl transition-colors duration-200 mt-auto text-sm"
        >
            View Details
        </button>
            </div>
        </div>
    );
};

export default RoomCard;