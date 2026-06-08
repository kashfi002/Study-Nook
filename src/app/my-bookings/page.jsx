import { CancelBooking } from '@/Components/CancelBooking';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react';

const StatusBadge = ({ status }) => {
    if (status === 'confirmed') {
        return (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-600 border border-green-200">
                Confirmed
            </span>
        );
    }
    return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-500 border border-red-200">
            Cancelled
        </span>
    );
};

export const metadata = {
  title: "My-Bookings",
};
const MyBookingPage = async () => {
    const {token} =await auth.api.getToken({
        headers: await headers()
    })
    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;

    const res = await fetch(`http://localhost:5000/booking/${user?.id}`, {
        headers: { authorization: `Bearer ${token}` },
        cache: 'no-store',
    });
    const bookings = await res.json();

    if (!bookings.length) {
        return (
            <div className="max-w-4xl mx-auto py-10 px-4">
                <h1 className="font-bold text-3xl mb-8">My Bookings</h1>
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                    <p className="text-xl font-medium">You have no bookings yet.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="font-bold text-3xl mb-8">My Bookings</h1>
            <div className="flex flex-col gap-4">
                {bookings.map((booking) => {
                    const isConfirmed = booking.status === 'confirmed';

                    return (
                        <div
                            key={booking._id}
                            className="w-full flex items-center gap-6 border border-gray-100 shadow-sm p-5 rounded-2xl bg-white"
                        >
                            <Image
                                alt={booking.roomName}
                                src={
                                    booking.image ||
                                    'https://images.unsplash.com/photo-1497366216548-37526070297c'
                                }
                                height={80}
                                width={80}
                                className="rounded-xl object-cover w-20 h-20 shrink-0"
                            />

                            <div className="flex-1 min-w-0">
                                <h2 className="font-bold text-lg text-gray-800 truncate">
                                    {booking.roomName}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {new Date(booking.bookingDate).toLocaleDateString(
                                        'en-US',
                                        {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        }
                                    )}
                                </p>
                            </div>

                            <div className="text-right shrink-0">
                                <p className="text-blue-600 font-bold text-lg">
                                    ${booking.result?.total || '0.00'}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {booking.result?.hours} hrs
                                </p>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                                <StatusBadge status={booking.status} />
                                {isConfirmed && (
                                    <CancelBooking bookingId={booking._id} />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyBookingPage;