"use client";

import { useParams } from "next/navigation";
import { ReplayView } from "@/components/research/ReplayView";

export default function RunReplayPage() {
  const { id } = useParams<{ id: string }>();
  return <ReplayView runId={id} />;
}
