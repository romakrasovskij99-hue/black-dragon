"use client";

import { useParams } from "next/navigation";
import { IdentityView } from "@/components/verification/IdentityView";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  return <IdentityView runId={id} />;
}
