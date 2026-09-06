"use client";

import { useParams } from "next/navigation";
import { StateView } from "@/components/verification/StateView";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  return <StateView runId={id} />;
}
