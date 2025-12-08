import { cn } from "@/lib/utils";
import { ShellIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

function Logo({
  fontSize = "text-xl",
  iconSize = 20,
}: {
  fontSize?: string;
  iconSize?: number;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "text-2xl font-extrabold flex items-center gap-2",
        fontSize
      )}
    >
      <div className="rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 p-1">
        <ShellIcon size={iconSize} className="stroke-white" />
      </div>
      <span className="bg-gradient-to-r from-rose-500 to-rose-600 bg-clip-text text-transparent">
        Scraper
      </span>
    </Link>
  );
}

export default Logo;
