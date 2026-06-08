"use client";

import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { EditModal } from '@/Components/EditModal';
import { Delete } from '@/Components/Delete';

const MyListingsPage = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListings = async () => {
            if (!user?.id) return;
            try {
                const { data: tokenData } = await authClient.token();
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/my-listings/${user.id}`, {
                    headers: {
                        authorization: `Bearer ${tokenData?.token}`
                    }
                });
                const data = await res.json();
                setRooms(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
    }, [user?.id]);

    if (loading) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <span className='loading loading-spinner loading-lg text-blue-600'></span>
            </div>
        );
    }

    if (!rooms.length) {
        return (
            <div className='max-w-4xl mx-auto py-10 px-4'>
                <h1 className='font-bold text-3xl mb-8'>My Listings</h1>
                <div className='flex flex-col items-center justify-center py-20 text-gray-400'>
                    <p className='text-xl font-medium'>You have not listed any rooms yet.</p>
                    <Link href='/add-room'>
                        <button className='mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-2xl transition-colors'>
                            Add a Room
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className='max-w-6xl mx-auto py-10 px-4'>
            <div className='flex items-center justify-between mb-8'>
                <h1 className='font-bold text-3xl'>My Listings</h1>
                <Link href='/add-room'>
                    <button className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-2xl text-sm transition-colors'>
                        + Add New Room
                    </button>
                </Link>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {rooms.map(room => (
                    <div key={room._id} className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col'>

                        <div className='relative w-full bg-gray-100' style={{ aspectRatio: '16/9' }}>
                            <Image
                                src={room.image || "https://images.unsplash.com/photo-1497366216548-37526070297c"}
                                alt={room.roomName}
                                fill
                                className='object-cover'
                            />
                            <span className='absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full'>
                                {room.floor || 'N/A'}
                            </span>
                        </div>

                        <div className='p-5 flex flex-col flex-grow'>
                            <div className='flex justify-between items-start gap-2 mb-2'>
                                <h3 className='text-lg font-bold text-gray-800 line-clamp-1'>{room.roomName}</h3>
                                <div className='flex flex-col items-end shrink-0'>
                                    <span className='text-lg font-extrabold text-blue-600'>${room.hourlyRate}</span>
                                    <span className='text-xs text-gray-400'>/ hour</span>
                                </div>
                            </div>

                            <p className='text-gray-500 text-sm mb-4 line-clamp-2 flex-grow'>{room.description}</p>

                            <div className='flex items-center gap-2 mb-4 pb-4 border-b border-gray-100 text-sm text-gray-600'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                </svg>
                                <span>Up to <span className='font-semibold text-gray-900'>{room.capacity || 1}</span> people</span>
                            </div>

                            <div className='flex flex-wrap gap-1.5 mb-5'>
                                {(room.amenities || []).slice(0, 3).map((amenity, idx) => (
                                    <span key={idx} className='bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-md'>
                                        {amenity}
                                    </span>
                                ))}
                                {(room.amenities || []).length > 3 && (
                                    <span className='bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-md'>
                                        +{room.amenities.length - 3} more
                                    </span>
                                )}
                            </div>

                            <div className='flex gap-2 mt-auto'>
                                <Link href={`/rooms/${room._id}`} className='flex-1'>
                                    <button className='w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-xl text-sm transition-colors'>
                                        View
                                    </button>
                                </Link>
                                <EditModal room={room} />
                                <Delete room={room} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyListingsPage;