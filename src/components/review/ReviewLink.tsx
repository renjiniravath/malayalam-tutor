"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { progressStore } from "@/lib/progress/store";

/**
 * Due-card count for the lessons page. Reads the IndexedDB store on the
 * client; shows the due count next to the Review link.
 */
export function ReviewLink() {
  const [due, setDue] = useState(0);

  useEffect(() => {
    const load = async () => {
      setDue(await progressStore.countDue(new Date()));
    };
    void load();
  }, []);

  return (
    <Link
      href="/review"
      className="inline-flex min-h-11 items-center rounded-full text-sm font-medium text-text-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
    >
      Review{due > 0 ? ` (${due})` : ""}
    </Link>
  );
}
