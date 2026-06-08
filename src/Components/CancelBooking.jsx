"use client";

import { AlertDialog, Button } from "@heroui/react";
import { TrashBin } from '@gravity-ui/icons';
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export function CancelBooking({ bookingId }) {
    const handleCancel = async () => {
        const{data:tokenData} = await authClient.token();
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${bookingId}`, {
            method: "DELETE",
            headers: { 'content-type': 'application/json',
                authorization: `Bearer ${tokenData?.token}`
             }
        });
        await res.json();
        toast.success("Booking cancelled successfully!");
        window.location.reload();
    };

    return (
        <AlertDialog>
            <Button variant='outline' className="border-red-500 text-red-500 rounded-none">
                <TrashBin /> Cancel
            </Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Cancel this booking?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>Are you sure you want to cancel this booking? This action cannot be undone.</p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">Keep Booking</Button>
                            <Button onClick={handleCancel} slot="close" variant="danger">
                                Yes, Cancel
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}