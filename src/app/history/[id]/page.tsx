import { findProposalById } from "@/lib/storage";
import ProposalResult from "@/components/ProposalResult";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProposalPage({ params }: Props) {
  const { id } = await params;
  const proposal = findProposalById(id);
  if (!proposal) notFound();

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Link href="/history" className="text-sm text-gray-500 hover:text-blue-600">
          ← Historial
        </Link>
        <span className="text-gray-300">|</span>
        <h1 className="text-lg font-bold text-gray-800 truncate">{proposal.projectName}</h1>
      </div>
      <ProposalResult proposal={proposal} />
    </div>
  );
}
