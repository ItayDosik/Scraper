import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import Editor from "../../_components/Editor";

async function page({ params }: { params: { automationId: string } }) {
  const { automationId } = params;
  const { userId } = auth();
  if (!userId) {
    return <div>Not authorized</div>;
  }

  const automation = await prisma.automation.findUnique({
    where: {
      id: automationId,
      userId: userId,
    },
  });

  if (!automation) {
    return <div>Automation not found</div>;
  }

  return <Editor automation={automation} />;
}

export default page;
