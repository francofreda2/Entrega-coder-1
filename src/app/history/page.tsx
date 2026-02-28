import { readProposals } from "@/lib/storage";
import HistoryList from "@/components/HistoryList";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function HistoryPage() {
  const proposals = readProposals();
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Historial</h1>
          <p className="text-gray-500 text-sm mt-1">
            {proposals.length} propuesta{proposals.length !== 1 ? "s" : ""} generada{proposals.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Nueva propuesta
        </Link>
      </div>
      <HistoryList proposals={proposals} />
    </div>
  );
}
