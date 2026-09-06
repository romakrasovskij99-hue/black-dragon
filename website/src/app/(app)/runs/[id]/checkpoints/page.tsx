"use client";

import { useParams } from "next/navigation";
import { CheckpointsView } from "@/components/verification/CheckpointsView";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  return <CheckpointsView runId={id} />;
}
