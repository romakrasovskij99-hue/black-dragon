"use client";

import { useParams } from "next/navigation";
import { StructureView } from "@/components/research/StructureView";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  return <StructureView runId={id} />;
}
