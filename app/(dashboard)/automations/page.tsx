import { GetAutomationsForUser } from "@/actions/automations/getAutomationsForUser";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import React, { Suspense } from "react";
import { AlertCircle, InboxIcon } from "lucide-react";
import CreateAutomationDialog from "./_components/CreateAutomationDialog";
import AutomationCard from "./_components/AutomationCard";

function page() {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Job Automations</h1>
          <p className="text-muted-foreground">
            Automatically collect new job listings from your selected platforms
          </p>
        </div>
        <CreateAutomationDialog />
      </div>

      <div className="h-full py-6">
        <Suspense fallback={<UserAutomationsSkeleton />}>
          <UserAutomations />
        </Suspense>
      </div>
    </div>
  );
}

function UserAutomationsSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-32 w-full" />
      ))}
    </div>
  );
}

async function UserAutomations() {
  const automations = await GetAutomationsForUser();
  if (!automations) {
    return (
      <Alert variant={"destructive"}>
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong</AlertDescription>
      </Alert>
    );
  }

  if (automations.length === 0) {
    return (
      <div className="flex flex-col gap-4 h-full items-center">
        <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
          <InboxIcon size={40} className="stroke-primary" />
        </div>
        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold">No automations created yet</p>
          <p className="text-sm text-muted-foreground">
            Click the buttom below to create your first automation
          </p>
        </div>
        <CreateAutomationDialog triggerText="Create Your First Automation" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {automations.map((automation, index) => (
        <AutomationCard key={automation.id} automation={automation} />
      ))}
    </div>
  );
}

export default page;
