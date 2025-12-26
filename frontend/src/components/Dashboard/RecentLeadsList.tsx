import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import type { Lead } from "../../shared/types";

export default function LeadsTable() {
    const { getLeads } = useAuth();
    const [loading, setLoading] = useState(false);
    const [leads, setLeads] = useState<Lead[]>([]);

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                setLoading(true);
                const response = await getLeads(1, 10);
                setLeads(response.data.leads);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchLeads();
    }, []);

    return (
        <div className="bg-brand-card/40 border border-brand-border rounded-2xl overflow-hidden backdrop-blur-md">
            <div className="p-5 md:p-6 border-b border-brand-border flex justify-between items-center">
                <h3 className="text-base md:text-lg font-bold text-white">
                    Recent Verified Leads
                </h3>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                        <tr className="bg-brand-dark/50 text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-slate-500">
                            <th className="px-4 md:px-6 py-4">Lead Source</th>
                            <th className="px-4 md:px-6 py-4">Status</th>
                            <th className="px-4 md:px-6 py-4">ID</th>
                            <th className="px-4 md:px-6 py-4 text-right md:text-left">
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border/50 text-xs md:text-sm">
                        {leads.slice(0, 5).map((lead, i) => (
                            <tr
                                key={i}
                                className="hover:bg-white/[0.02] transition-colors"
                            >
                                <td className="px-4 md:px-6 py-4 text-white font-medium whitespace-nowrap">
                                    {lead.source.sourceName}
                                </td>
                                <td className="px-4 md:px-6 py-4">
                                    <span
                                        className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                                            lead.validationStatus === "valid"
                                                ? "bg-green-500/10 text-green-500"
                                                : "bg-red-500/10 text-red-500"
                                        }`}
                                    >
                                        {lead.validationStatus}
                                    </span>
                                </td>
                                <td className="px-4 md:px-6 py-4 text-slate-400 font-mono text-[10px] md:text-xs">
                                    {lead.source._id.slice(-6)}...
                                </td>
                                <td className="px-4 md:px-6 py-4 text-slate-500 whitespace-nowrap text-right md:text-left">
                                    {new Date(
                                        lead.createdAt
                                    ).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="lg:hidden p-3 text-center border-t border-brand-border/30">
                <p className="text-[10px] text-slate-500 italic">
                    Swipe left to view full details
                </p>
            </div>
        </div>
    );
}
