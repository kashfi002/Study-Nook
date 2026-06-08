"use client";
import { FaRegEdit } from "react-icons/fa";
import { Button, Modal, Surface } from "@heroui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export function EditModal({ room }) {
    const { _id, roomName, description, image, floor, capacity, hourlyRate, amenities = [] } = room;
    const [open, setOpen] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const updatedRoom = Object.fromEntries(formData.entries())
        updatedRoom.amenities = formData.getAll('amenities')

          const{data:tokenData} = await authClient.token();
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${_id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json',
                  authorization: `Bearer ${tokenData?.token}`
             },
            body: JSON.stringify(updatedRoom)
        })
        const data = await res.json()

        if (res.ok) {
            toast.success("Room updated successfully!")
            setOpen(false)
            window.location.reload()
        } else {
            toast.error("Failed to update room.")
        }
    }

    return (
        <Modal open={open} onOpenChange={setOpen}>
            <Modal.Trigger>
                <div className="flex justify-end max-w-6xl mx-auto mb-4">
                    <button className="btn btn-outline rounded-none flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                        <FaRegEdit />
                        Edit
                    </button>
                </div>
            </Modal.Trigger>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md max-h-[90vh]">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading>Edit Room</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="p-6 overflow-y-auto">
                            <Surface variant="default">
                                <form onSubmit={onSubmit} className="w-full max-w-xl space-y-4 bg-white p-8 rounded-2xl shadow-md">

                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="roomName" className="font-medium text-gray-700">Room Name</label>
                                        <input id="roomName" type="text" name="roomName" placeholder="Room Name"
                                            defaultValue={roomName} required
                                            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="description" className="font-medium text-gray-700">Description</label>
                                        <textarea id="description" name="description" placeholder="Description"
                                            defaultValue={description} required
                                            className="border border-gray-300 rounded-lg p-3 w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="image" className="font-medium text-gray-700">Image URL</label>
                                        <input id="image" type="url" name="image" placeholder="Image URL"
                                            defaultValue={image}
                                            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="floor" className="font-medium text-gray-700">Floor</label>
                                        <input id="floor" type="text" name="floor" placeholder="Floor (e.g. 3rd Floor)"
                                            defaultValue={floor}
                                            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="capacity" className="font-medium text-gray-700">Capacity</label>
                                        <input id="capacity" type="number" name="capacity" placeholder="Capacity (e.g. 4)"
                                            defaultValue={capacity}
                                            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="hourlyRate" className="font-medium text-gray-700">Hourly Rate</label>
                                        <input id="hourlyRate" type="number" name="hourlyRate" placeholder="Hourly Rate ($)"
                                            defaultValue={hourlyRate}
                                            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>

                                    <div className="space-y-2">
                                        <p className="font-semibold text-gray-700">Amenities</p>
                                        {["Whiteboard", "Projector", "Wi-Fi", "Power Outlets", "Quiet Zone", "Air Conditioning"].map((item) => (
                                            <label key={item} className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" name="amenities" value={item}
                                                    defaultChecked={amenities.includes(item)} />
                                                <span>{item}</span>
                                            </label>
                                        ))}
                                    </div>

                                    <button type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition mt-4">
                                        Save Changes
                                    </button>
                                </form>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}