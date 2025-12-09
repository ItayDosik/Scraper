"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AutomationStatus } from "@/types/automation";
import { Automation } from "@prisma/client";
import {
  Edit2Icon,
  FilePen,
  FileTextIcon,
  MoreVerticalIcon,
  PlayIcon,
  ShuffleIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TooltipWrapper from "@/components/TooltipWrapper";
import DeleteAutomationDialog from "./DeleteAutomationDialog";
import { Badge } from "@/components/ui/badge";

const statusColors = {
  [AutomationStatus.DRAFT]: "bg-rose-200 text-rose-600",
  [AutomationStatus.PUBLISHED]: "bg-primary",
};

function AutomationCard({ automation }: { automation: Automation }) {
  const isDraft = automation.status === AutomationStatus.DRAFT;
  return (
    <Card className="border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/30">
      <CardContent className="p-4 flex items-center justify-between h-[100px]">
        <div className="flex items-center justify-end space-x-3">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              statusColors[automation.status as AutomationStatus]
            )}
          >
            {isDraft ? (
              <FilePen className="w-5 h-5" />
            ) : (
              <PlayIcon className="w-5 h-5 text-white" />
            )}
          </div>
          <div className="">
            <h3 className="text-base font-bold text-muted-foreground flex items-center">
              <Link
                href={`/automation/editor/${automation.id}`}
                className="flex items-center hover:underline"
              >
                {automation.name}
              </Link>
              {isDraft && (
                <Badge className="ml-2 font-medium ">Draft</Badge>
              )}
            </h3>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            href={`/automation/editor/${automation.id}`}
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
              }),
              "flex items-center gap-2"
            )}
          >
            <Edit2Icon size={16} />
            Edit
          </Link>
          <AutomationActions
            automationName={automation.name}
            automationId={automation.id}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function AutomationActions({
  automationName,
  automationId,
}: {
  automationName: string;
  automationId: string;
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <DeleteAutomationDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        automationName={automationName}
        automationId={automationId}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} size={"sm"}>
            <TooltipWrapper content={"More actions"}>
              <div className="flex items-center justify-center w-full h-full">
                <MoreVerticalIcon size={18} />
              </div>
            </TooltipWrapper>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive flex items-center gap-2"
            onSelect={() => {
              setShowDeleteDialog((prev) => !prev);
            }}
          >
            <TrashIcon size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default AutomationCard;
