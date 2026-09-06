"use client";

import { useParams } from "next/navigation";
import { ConfluencesView } from "@/components/research/ConfluencesView";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  return <ConfluencesView runId={id} />;
}
