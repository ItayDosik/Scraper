"use client";

import { DeleteAutomation } from "@/actions/automations/deleteAutomation";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  automationName: string;
  automationId: string;
}

function DeleteAutomationDialog({
  open,
  setOpen,
  automationName,
  automationId,
}: Props) {
  const [confirmText, setConfirmText] = useState("");

  const deleteMutation = useMutation({
    mutationFn: DeleteAutomation,
    onSuccess: () => {
      toast.success("Automation deleted successfully", {
        id: automationId,
      });
      setConfirmText("");
    },
    onError: () => {
      toast.success("Something went wrong", {
        id: automationId,
      });
    },
  });
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutley sure?</AlertDialogTitle>
          <AlertDialogDescription>
            If you delete this automation, you will not be able to recover it
            <div className="flex flex-col py-4 gap-2">
              <p className="">
                If you are sure, enter <b>{automationName}</b> to confirm
              </p>
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmText("")}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={
              confirmText !== automationName || deleteMutation.isPending
            }
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={() => {
              toast.loading("Deleting automation", {
                id: automationId,
              });
              deleteMutation.mutate(automationId);
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteAutomationDialog;
