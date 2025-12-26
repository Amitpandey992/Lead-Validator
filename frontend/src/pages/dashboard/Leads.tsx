import { Plus, MoreVertical } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import type { Lead, Source } from "../../shared/types";
import LeadEntryModel from "../../components/LeadEntryModel";

export default function Leads() {
    const { getLeads, getLeadsBySource, getUserSources } = useAuth();

    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [source, setSource] = useState<Source[]>([]);
    const [selectedSource, setSelectedSource] = useState<string>("");

    const ITEMS_PER_PAGE = 10;
    const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const end = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

    const handleLeadAdded = (newLead: Lead) => {
        setLeads((prev) => [newLead, ...prev]);
        setTotalItems((prev) => prev + 1);
    };

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                setLoading(true);
                let response;
                if (selectedSource) {
                    response = await getLeadsBySource(
                        selectedSource,
                        currentPage,
                        ITEMS_PER_PAGE
                    );
                } else {
                    response = await getLeads(currentPage, ITEMS_PER_PAGE);
                }
                setLeads(response.data.leads);
                setTotalItems(response.data.totalItems);
                setTotalPages(response.data.totalPages);
            } catch (error: any) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchLeads();
    }, [currentPage, selectedSource]);

    useEffect(() => {
        const fetchSources = async () => {
            try {
                setLoading(true);
                const response = await getUserSources(1, 1000);
                setSource(response.data.sources);
            } catch (error: any) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchSources();
    }, []);

    return (
        <div className="p-4 sm:p-6 md:p-10 bg-brand-dark min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8 md:mb-10">
                <div>
                    <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
                        All Leads
                    </h1>
                    <p className="text-sm md:text-base text-slate-400">
                        View and manage your acquired leads data and validation
                        results.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        className="w-full md:w-auto flex justify-center items-center gap-2 bg-brand-blue text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-blue-500/20 cursor-pointer active:scale-95 transition"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Plus size={18} /> Add Lead
                    </button>
                </div>
            </div>

            <div className="bg-brand-card/30 border border-brand-border rounded-xl p-4 mb-6">
                <div className="w-full max-w-xs">
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-2 tracking-widest">
                        Filter by Source
                    </label>
                    <select
                        className="w-full bg-brand-input border border-brand-border rounded-lg p-2.5 text-sm text-white outline-none focus:border-brand-blue transition"
                        value={selectedSource}
                        onChange={(e) => {
                            setSelectedSource(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="">Choose Source</option>
                        {source.map((s) => (
                            <option key={s.sourceId} value={s.sourceId}>
                                {s.sourceName}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="bg-brand-card border border-brand-border rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="text-[10px] uppercase font-bold text-slate-500 border-b border-brand-border bg-slate-800/20">
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Phone</th>
                                <th className="px-6 py-4">Validation Status</th>
                                <th className="px-6 py-4">Source</th>
                                <th className="px-6 py-4">Date/Time</th>
                                <th className="px-6 py-4 text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-border">
                            {leads.map((lead, i) => (
                                <tr
                                    key={i}
                                    className="hover:bg-slate-800/20 transition group"
                                >
                                    <td className="px-6 py-4 font-medium text-white text-sm whitespace-nowrap">
                                        {lead.email}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-400 whitespace-nowrap">
                                        {lead.phone}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border whitespace-nowrap ${
                                                lead.validationStatus ===
                                                "Valid"
                                                    ? "bg-green-500/10 text-green-500 border-green-500/20"
                                                    : lead.validationStatus ===
                                                      "Invalid"
                                                    ? "bg-red-500/10 text-red-500 border-red-500/20"
                                                    : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                            }`}
                                        >
                                            <div
                                                className={`w-1.5 h-1.5 rounded-full ${
                                                    lead.validationStatus ===
                                                    "Valid"
                                                        ? "bg-green-500"
                                                        : lead.validationStatus ===
                                                          "Invalid"
                                                        ? "bg-red-500"
                                                        : "bg-amber-500"
                                                }`}
                                            />
                                            {lead.validationStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-400 whitespace-nowrap">
                                        {lead.source.sourceName}
                                    </td>
                                    <td className="px-6 py-4 text-xs text-slate-500 whitespace-nowrap">
                                        {new Date(
                                            lead.createdAt
                                        ).toLocaleString("en-US", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-slate-500 hover:text-white hover:bg-slate-800/50 rounded-lg transition">
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 border-t border-brand-border flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
                    <p className="text-slate-500 text-xs md:text-sm order-2 sm:order-1">
                        Showing{" "}
                        <span className="text-white font-bold">{start}</span> to{" "}
                        <span className="text-white font-bold">{end}</span> of{" "}
                        <span className="text-white font-bold">
                            {totalItems}
                        </span>{" "}
                        results
                    </p>

                    <div className="flex gap-1 md:gap-2 order-1 sm:order-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((p) => p - 1)}
                            className={`w-8 h-8 flex items-center justify-center rounded border border-brand-border transition ${
                                currentPage === 1
                                    ? "opacity-30 cursor-not-allowed"
                                    : "hover:bg-slate-800 text-white"
                            }`}
                        >
                            ‹
                        </button>

                        <div className="flex gap-1 overflow-x-auto max-w-[150px] sm:max-w-none no-scrollbar">
                            {Array.from({ length: totalPages }).map((_, i) => {
                                const page = i + 1;
                                return (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`min-w-[32px] h-8 flex items-center justify-center rounded border transition-all ${
                                            currentPage === page
                                                ? "border-brand-blue bg-brand-blue text-white font-bold"
                                                : "border-transparent text-slate-500 hover:text-white"
                                        }`}
                                    >
                                        {page}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((p) => p + 1)}
                            className={`w-8 h-8 flex items-center justify-center rounded border border-brand-border transition ${
                                currentPage === totalPages
                                    ? "opacity-30 cursor-not-allowed"
                                    : "hover:bg-slate-800 text-white"
                            }`}
                        >
                            ›
                        </button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <LeadEntryModel
                    onClose={() => setIsModalOpen(false)}
                    onLeadAdded={handleLeadAdded}
                />
            )}
        </div>
    );
}
