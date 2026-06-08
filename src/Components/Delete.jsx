"use client";

import { authClient } from "@/lib/auth-client";
import {AlertDialog, Button} from "@heroui/react";
import { redirect } from "next/navigation";
import { CiTrash } from "react-icons/ci";
export function Delete({room}) {
    const {_id} = room;
    const onDelete = async () => {
        const{data:tokenData} = await authClient.token();
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${_id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json',
                authorization: `Bearer ${tokenData?.token}`
             }
        });
            const data = await res.json()
            redirect('/rooms')
    };
  return (
    <AlertDialog>
      <Button variant="outline" className="text-red-600 rounded-none hover:text-red-700 font-medium">
        <CiTrash/>
        Delete Your Room
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete your room permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete your room and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button 
              onClick={onDelete}
              slot="close" variant="danger">
                Delete 
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}