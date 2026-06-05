"use client";

import { authClient } from "@/lib/auth-client";
import { Button, DateField, Description, FieldError, Label, Modal, Surface, TimeField } from "@heroui/react";
import { useState } from "react";

export function BookingModal({room}) {
     const { data: session, } = authClient.useSession()
       const user = session?.user
       console.log(user) 
    const hourlyRate = Number(room.hourlyRate) || 0;
    const[departureDate,setDepartureDate]=useState(null)
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleStartTime = (val) => {
    console.log("startTime val:", val);
    setStartTime(val);
  };

  const handleEndTime = (val) => {
    console.log("endTime val:", val); 
    setEndTime(val);
  };

  const calculateTotal = () => {
    if (!startTime || !endTime) return null;
    // @heroui TimeField returns a TimeValue object with .hour and .minute
    const startMinutes = startTime.hour * 60 + startTime.minute;
    const endMinutes = endTime.hour * 60 + endTime.minute;
    const diffHours = (endMinutes - startMinutes) / 60;
    if (diffHours <= 0) return null;
    return { hours: diffHours.toFixed(1), total: (diffHours * hourlyRate).toFixed(2) };
  };

  const result = calculateTotal();

  const handleBooking = async() => {
    const bookingData = {
        userId: user?.id,
        userName: user?.name,
        userImage: user?.image,
        roomId: room._id,
        departureDate: new Date(departureDate), 
        roomName: room.roomName,
        startTime,
        endTime,
        result 
    }
    console.log("Booking Data:", bookingData);
  }

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
                  <DateField onChange={setDepartureDate} name="date" className="w-full">
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

                  {/* Total Cost Summary */}
                  <div className="rounded-2xl bg-blue-50 border border-blue-100 px-5 py-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      {result
                        ? `${result.hours} hrs × $${hourlyRate}/hr`
                        : "Select start & end time"}
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
               slot="close">Confirm Booking</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}