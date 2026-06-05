"use client"

import { toast } from "react-toastify";

const AddRoomPage = () => {
    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const room = Object.fromEntries(formData.entries())
        room.amenities = formData.getAll('amenities');
       
        const res = await fetch('http://localhost:5000/rooms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(room)
        })
        const data = await res.json()
        toast.success("Room added successfully")
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
            <form
                onSubmit={onSubmit}
                className="w-full max-w-xl space-y-4 bg-white p-8 rounded-2xl shadow-md"
            >
                <h1 className="text-2xl font-semibold text-center mb-2">
                    Add Room
                </h1>

                {/* Room Name */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="roomName" className="font-medium text-gray-700">Room Name</label>
                    <input
                        id="roomName"
                        type="text"
                        name="roomName"
                        placeholder="Room Name"
                        required
                        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="description" className="font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Description"
                        required
                        className="border border-gray-300 rounded-lg p-3 w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Image URL */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="image" className="font-medium text-gray-700">Image URL</label>
                    <input
                        id="image"
                        type="url"
                        name="image"
                        placeholder="Image URL"
                        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Floor */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="floor" className="font-medium text-gray-700">Floor</label>
                    <input
                        id="floor"
                        type="text"
                        name="floor"
                        placeholder="Floor (e.g. 3rd Floor)"
                        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Capacity */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="capacity" className="font-medium text-gray-700">Capacity</label>
                    <input
                        id="capacity"
                        type="number"
                        name="capacity"
                        placeholder="Capacity (e.g. 4)"
                        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Hourly Rate */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="hourlyRate" className="font-medium text-gray-700">Hourly Rate</label>
                    <input
                        id="hourlyRate"
                        type="number"
                        name="hourlyRate"
                        placeholder="Hourly Rate ($)"
                        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Amenities */}
                <div className="space-y-2">
                    <p className="font-semibold text-gray-700">Amenities</p>
                    {["Whiteboard", "Projector", "Wi-Fi", "Power Outlets", "Quiet Zone", "Air Conditioning"].map(
                        (item) => (
                            <label key={item} className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" name="amenities" value={item} />
                                <span>{item}</span>
                            </label>
                        )
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition mt-4"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddRoomPage;