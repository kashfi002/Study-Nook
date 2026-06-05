"use client"
import React from 'react';
import { BookingModal } from './BookingModal';
import { authClient } from '@/lib/auth-client';
const BookingCard = ({room}) => {
    const { data: session, } = authClient.useSession() 
      const user = session?.user 
    return (
         <div className="lg:sticky lg:top-8 bg-white p-6 rounded-3xl border border-gray-100 shadow-md space-y-6">
                       
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Rate</span>
                            <div className="flex items-baseline gap-1 mt-1">
                                <span className="text-4xl font-black text-gray-900">${room.hourlyRate || 0}</span>
                                <span className="text-sm text-gray-500 font-medium">/ hour</span>
                            </div>
                        <div>
                        <hr className="border-gray-100" />
                        <BookingModal room={room}></BookingModal>
                        </div>
                        </div>
    );
};

export default BookingCard;