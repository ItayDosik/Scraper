"use client";

import { Automation } from "@prisma/client";
import React from "react";
import { ReactFlowProvider } from "@xyflow/react";
import AutomationEditor from "./AutomationEditor";

function Editor({ automation }: { automation: Automation }) {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-full w-full overflow-hidden">
        <section className="flex h-full overflow-auto">
          <AutomationEditor automation={automation} />
        </section>
      </div>
    </ReactFlowProvider>
  );
}

export default Editor;
