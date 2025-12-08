"use server";

import prisma from "@/lib/prisma";
import {
  createAutomationSchema,
  createAutomationSchemaType,
} from "@/schema/automation";
import { AutomationStatus } from "@/types/automation";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateAutomation(form: createAutomationSchemaType) {
  const { success, data } = createAutomationSchema.safeParse(form);
  if (!success) {
    throw new Error("invalid form data");
  }

  const { userId } = auth();

  if (!userId) {
    throw new Error("unauthenticated");
  }

  const result = await prisma.automation.create({
    data: {
      userId,
      status: AutomationStatus.DRAFT,
      definition: "TODO",
      ...data,
    },
  });

  if (!result) {
    throw new Error("failed to create automation");
  }

  redirect(`/automations/editor/${result.id}`);
}
