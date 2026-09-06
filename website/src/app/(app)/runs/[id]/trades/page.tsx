"use client";

import { useParams } from "next/navigation";
import { TradesView } from "@/components/research/TradesView";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  return <TradesView runId={id} />;
}
