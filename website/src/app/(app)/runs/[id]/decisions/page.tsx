"use client";

import { useParams } from "next/navigation";
import { DecisionsView } from "@/components/research/DecisionsView";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  return <DecisionsView runId={id} />;
}
