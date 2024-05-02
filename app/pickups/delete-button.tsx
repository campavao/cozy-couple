"use client";
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCallback, useState } from "react";
import { SubmitButton } from "../components/SubmitButton";
import { useRouter } from "next/navigation";

export function DeleteButton({ id }: { id: string }) {
  const [open, setOpen] = useState<boolean>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onDelete = useCallback(
    async (e: any) => {
      e.preventDefault();
      setLoading(true);
      try {
        await fetch(`/api/pickups/${id}`, {
          method: "DELETE",
        });
        setOpen(false);
        router.refresh();
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    },
    [router, id]
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        setLoading(false);
      }}
    >
      <DialogTrigger asChild>
        <Button variant='destructive' onClick={() => setOpen(true)}>
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Are you sure you want to delete this?</DialogHeader>
        <DialogFooter className='flex flex-col gap-4'>
          <SubmitButton
            loading={loading}
            onClick={onDelete}
            variant='destructive'
            className='flex-1'
          >
            Confirm
          </SubmitButton>
          <DialogClose onClick={() => setOpen(false)}>Cancel</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
