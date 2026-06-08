import RoomCard from '@/Components/RoomCard';
import React from 'react';
export const metadata = {
  title: "All-Rooms",
};
const AllPage = async () => {
    const res = await fetch('http://localhost:5000/rooms')
    const rooms = await res.json()
    return (
        <div>
            <h1 className='text-3xl font-bold text-center container mx-auto my-8'>All Rooms</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4'>
                {rooms.map(room => (
                    <RoomCard key={room._id} room={room} />
                ))}
            </div>
        </div>
    );
};

export default AllPage;