import RoomCard from '@/Components/RoomCard';
import RoomsFilter from '@/Components/RoomsFilter';
import { Suspense } from 'react';
import React from 'react';

export const metadata = {
    title: "All-Rooms",
};

const AllPage = async ({ searchParams }) => {
    const { search, amenities, minRate, maxRate } = await searchParams;

    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (amenities) params.set('amenities', amenities);
    if (minRate) params.set('minRate', minRate);
    if (maxRate) params.set('maxRate', maxRate);

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms?${params.toString()}`, {
        cache: 'no-store'
    });
    const rooms = await res.json();

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-8">All Rooms</h1>
            <div className="flex flex-col lg:flex-row gap-8">
                <aside className="lg:w-72 shrink-0">
                    <Suspense>
                        <RoomsFilter />
                    </Suspense>
                </aside>

                {/* Room Cards */}
                <div className="flex-1">
                    {rooms.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                            <p className="text-xl font-medium">No rooms found.</p>
                            <p className="text-sm mt-1">Try adjusting your filters.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {rooms.map(room => (
                                <RoomCard key={room._id} room={room} />
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default AllPage;