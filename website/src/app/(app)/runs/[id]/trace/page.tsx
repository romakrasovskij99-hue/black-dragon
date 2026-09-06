"use client";

import { useParams } from "next/navigation";
import { TraceView } from "@/components/verification/TraceView";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  return <TraceView runId={id} />;
}
