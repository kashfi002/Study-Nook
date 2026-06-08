"use client";

import { authClient } from "@/lib/auth-client";
import { Button, DateField, Description, FieldError, Label, Modal, Surface, TimeField } from "@heroui/react";
import { useState } from "react";
import { toast } from "react-toastify";

export function BookingModal({ room }) {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const hourlyRate = Number(room.hourlyRate) || 0;
    const [bookingDate, setBookingDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleStartTime = (val) => setStartTime(val);
    const handleEndTime = (val) => setEndTime(val);

    const calculateTotal = () => {
        if (!startTime || !endTime) return null;
        const startMinutes = startTime.hour * 60 + startTime.minute;
        const endMinutes = endTime.hour * 60 + endTime.minute;
        const diffHours = (endMinutes - startMinutes) / 60;
        if (diffHours <= 0) return null;
        return { hours: diffHours.toFixed(1), total: (diffHours * hourlyRate).toFixed(2) };
    };

    const result = calculateTotal();

    const formatTime = (t) => {
        if (!t) return null;
        return `${String(t.hour).padStart(2, '0')}:${String(t.minute).padStart(2, '0')}`;
    };

    const handleBooking = async () => {
        if (!bookingDate || !startTime || !endTime) {
            toast.error("Please fill in all booking details.");
            return;
        }
        if (!result) {
            toast.error("End time must be after start time.");
            return;
        }

        setLoading(true);
        try {
            const bookingData = {
                userId: user?.id,
                userName: user?.name,
                userImage: user?.image,
                roomId: room._id,
                bookingDate: `${bookingDate.year}-${String(bookingDate.month).padStart(2, '0')}-${String(bookingDate.day).padStart(2, '0')}`,
                roomName: room.roomName,
                image: room.image,
                startTime: formatTime(startTime),
                endTime: formatTime(endTime),
                result
            };

            const { data: tokenData } = await authClient.token();
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${tokenData?.token}`
                },
                body: JSON.stringify(bookingData)
            });

            const data = await res.json();

            if (res.status === 409) {
                toast.error("This room is already booked for the selected time!");
                return;
            }
            if (!res.ok) {
                toast.error("Something went wrong. Please try again.");
                return;
            }
            toast.success("Room booked successfully!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal>
            <Modal.Trigger>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]">
                    Book Now
                </button>
            </Modal.Trigger>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading>Book your room</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form className="flex flex-col gap-6">
                                    <DateField onChange={setBookingDate} name="date" className="w-full">
                                        <Label>Date of Booking</Label>
                                        <DateField.Group>
                                            <DateField.Input>
                                                {(segment) => <DateField.Segment segment={segment} />}
                                            </DateField.Input>
                                        </DateField.Group>
                                        <Description />
                                        <FieldError />
                                    </DateField>

                                    <div className="flex flex-row gap-6">
                                        <TimeField name="startTime" className="w-full" onChange={handleStartTime}>
                                            <Label>Start Time</Label>
                                            <TimeField.Group>
                                                <TimeField.Input>
                                                    {(segment) => <TimeField.Segment segment={segment} />}
                                                </TimeField.Input>
                                            </TimeField.Group>
                                            <FieldError />
                                        </TimeField>

                                        <TimeField name="endTime" className="w-full" onChange={handleEndTime}>
                                            <Label>End Time</Label>
                                            <TimeField.Group>
                                                <TimeField.Input>
                                                    {(segment) => <TimeField.Segment segment={segment} />}
                                                </TimeField.Input>
                                            </TimeField.Group>
                                            <FieldError />
                                        </TimeField>
                                    </div>

                                    <div className="rounded-2xl bg-blue-50 border border-blue-100 px-5 py-4 flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-500">
                                            {result ? `${result.hours} hrs × $${hourlyRate}/hr` : "Select start & end time"}
                                        </span>
                                        <span className="text-xl font-black text-blue-600">
                                            {result ? `$${result.total}` : "--"}
                                        </span>
                                    </div>
                                </form>
                            </Surface>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button slot="close" variant="secondary">Cancel Booking</Button>
                            <Button
                                onClick={handleBooking}
                                disabled={loading}
                                slot="close"
                            >
                                {loading
                                    ? <span className="loading loading-spinner loading-xs"></span>
                                    : "Confirm Booking"
                                }
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}