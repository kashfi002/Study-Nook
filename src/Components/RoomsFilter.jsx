"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const AMENITIES = ["Whiteboard", "Projector", "Wi-Fi", "Power Outlets", "Quiet Zone", "Air Conditioning"];

const RoomsFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [selectedAmenities, setSelectedAmenities] = useState(
        searchParams.get('amenities') ? searchParams.get('amenities').split(',') : []
    );
    const [minRate, setMinRate] = useState(searchParams.get('minRate') || '');
    const [maxRate, setMaxRate] = useState(searchParams.get('maxRate') || '');

    const applyFilters = () => {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (selectedAmenities.length > 0) params.set('amenities', selectedAmenities.join(','));
        if (minRate) params.set('minRate', minRate);
        if (maxRate) params.set('maxRate', maxRate);
        router.push(`/rooms?${params.toString()}`);
    };

    const clearFilters = () => {
        setSearch('');
        setSelectedAmenities([]);
        setMinRate('');
        setMaxRate('');
        router.push('/rooms');
    };

    const toggleAmenity = (amenity) => {
        setSelectedAmenities(prev =>
            prev.includes(amenity)
                ? prev.filter(a => a !== amenity)
                : [...prev, amenity]
        );
    };

    return (
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6">

            {/* Search */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Search by name</label>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
                    placeholder="e.g. Focus Lounge"
                    className="border border-gray-200 rounded-xl p-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Amenities */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Amenities</label>
                <div className="flex flex-wrap gap-2">
                    {AMENITIES.map(amenity => (
                        <button
                            key={amenity}
                            onClick={() => toggleAmenity(amenity)}
                            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                                selectedAmenities.includes(amenity)
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-400'
                            }`}
                        >
                            {amenity}
                        </button>
                    ))}
                </div>
            </div>

            {/* Hourly Rate Range */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Hourly rate ($)</label>
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        value={minRate}
                        onChange={(e) => setMinRate(e.target.value)}
                        placeholder="Min"
                        className="border border-gray-200 rounded-xl p-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-400 text-sm">to</span>
                    <input
                        type="number"
                        value={maxRate}
                        onChange={(e) => setMaxRate(e.target.value)}
                        placeholder="Max"
                        className="border border-gray-200 rounded-xl p-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
                <button
                    onClick={applyFilters}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
                >
                    Apply Filters
                </button>
                <button
                    onClick={clearFilters}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl text-sm transition-colors"
                >
                    Clear
                </button>
            </div>
        </div>
    );
};

export default RoomsFilter;