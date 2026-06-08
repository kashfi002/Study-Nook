import BookingCard from '@/Components/BookingCard';
import { Delete } from '@/Components/Delete';
import { EditModal } from '@/Components/EditModal';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

export const metadata = {
  title: "Room-Details",
};
const RoomDetailsPage = async ({ params }) => {
    const { id } = await params;
    const {token} =await auth.api.getToken({
        headers: await headers()
    })
    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;

    const res = await fetch(`http://localhost:5000/rooms/${id}`, {
        headers: { authorization: `Bearer ${token}` },
        cache: 'no-store'
    });
    const room = await res.json();

    const { roomName, description, image, floor, capacity, hourlyRate } = room;
    const { amenities = [] } = room;

    const isCreator = user?.id === room.creatorId;

    return (
        <div className="min-h-screen bg-gray-50/50 py-10 px-4 sm:px-6 lg:px-8">
            {isCreator && (
                <div className="flex justify-end max-w-6xl gap-4 mx-auto mb-4">
                    <EditModal room={room} />
                    <Delete room={room} />
                </div>
            )}
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2 space-y-6">

                        <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-gray-100 shadow-sm border border-gray-100">
                            <img
                                src={image || "https://images.unsplash.com/photo-1497366216548-37526070297c"}
                                alt={roomName}
                                className="w-full h-full object-cover"
                            />
                            <span className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                                Located on: {floor || 'Main Level'}
                            </span>
                        </div>

                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                                {roomName || 'Premium Workspace'}
                            </h1>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-2">
                                <div className="bg-gray-50 p-3 rounded-2xl flex flex-col">
                                    <span className="text-xs text-gray-400 font-medium">Capacity</span>
                                    <span className="text-base font-semibold text-gray-800">Up to {capacity || 1} People</span>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-2xl flex flex-col">
                                    <span className="text-xs text-gray-400 font-medium">Rate</span>
                                    <span className="text-base font-semibold text-gray-800">${hourlyRate || 0} / hour</span>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-2xl col-span-2 sm:col-span-1 flex flex-col justify-center">
                                    <span className="text-xs text-gray-400 font-medium">Availability</span>
                                    <span className="text-base font-semibold text-emerald-600 flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                        Ready to Book
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-3">
                            <h2 className="text-xl font-bold text-gray-900">About this Room</h2>
                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                                {description || 'No detailed description available for this configuration.'}
                            </p>
                        </div>

                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                            <h2 className="text-xl font-bold text-gray-900">What this room offers</h2>
                            {amenities.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {amenities.map((amenity, idx) => (
                                        <div key={idx} className="flex items-center gap-3 bg-blue-50/50 px-4 py-3 rounded-xl border border-blue-50">
                                            <svg className="w-5 h-5 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-sm font-medium text-gray-700">{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400 text-sm">No special amenities listed for this room.</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <BookingCard room={room} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetailsPage;