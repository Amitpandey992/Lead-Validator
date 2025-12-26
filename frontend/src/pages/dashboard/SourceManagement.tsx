import { Plus, Copy, Globe } from "lucide-react";
import AddSourceModal from "../../components/AddSourceModal";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import type { Source } from "../../shared/types";
import { toast } from "react-toastify";

export default function SourceManagement() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { getUserSources } = useAuth();
    const [sources, setSources] = useState<Source[]>([]);

    const ITEMS_PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const end = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

    const fetchSources = async () => {
        try {
            const response = await getUserSources(currentPage, 10);
            setSources(response.data.sources);
            setTotalPages(response.data.totalPages);
            setTotalItems(response.data.totalItems);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSourceCreated = (newSource: Source) => {
        setSources((prev) => [newSource, ...prev]);
        setTotalItems((prev) => prev + 1);
    };

    useEffect(() => {
        fetchSources();
    }, [currentPage]);

    return (
        <div className="bg-brand-dark min-h-screen p-4 sm:p-6 md:p-10 text-slate-300">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
                        My Sources
                    </h1>
                    <p className="text-sm md:text-base text-slate-400">
                        Manage your lead sources and integration keys.
                    </p>
                </div>
                <button
                    className="w-full md:w-auto bg-brand-blue text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 cursor-pointer active:scale-95 transition-transform"
                    onClick={() => setIsModalOpen(true)}
                >
                    <Plus size={20} /> Create New Source
                </button>
            </div>

            <div className="bg-brand-card rounded-2xl border border-brand-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[700px]">
                        <thead className="bg-slate-800/50 text-[10px] uppercase font-bold text-slate-500 tracking-widest border-b border-brand-border">
                            <tr>
                                <th className="px-6 py-4">Source Name</th>
                                <th className="px-6 py-4">Source ID</th>
                                <th className="px-6 py-4">API Key</th>
                                <th className="px-6 py-4 text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-border">
                            {sources.map((src) => (
                                <tr
                                    key={src._id}
                                    className="hover:bg-slate-800/30 transition"
                                >
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="shrink-0 w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 border border-blue-500/20">
                                                <Globe size={20} />
                                            </div>
                                            <p className="font-bold text-white text-sm truncate max-w-[150px]">
                                                {src.sourceName}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <code className="bg-slate-900 border border-brand-border px-3 py-1 rounded text-[10px] text-slate-400 font-mono">
                                            {src.sourceId}
                                        </code>
                                    </td>
                                    <td className="px-6 py-5 font-mono text-[10px] text-slate-500">
                                        <span className="truncate block max-w-[120px]">
                                            {src.apiKey}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(
                                                    src.apiKey
                                                );
                                                toast.success(
                                                    "API key copied to clipboard"
                                                );
                                            }}
                                            className="flex items-center gap-2 bg-slate-800 border border-brand-border px-4 py-2 rounded-lg text-xs font-bold text-slate-300 hover:bg-slate-700 transition-colors ml-auto"
                                        >
                                            <Copy size={14} />{" "}
                                            <span className="hidden sm:inline">
                                                Copy Key
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 border-t border-brand-border flex flex-col sm:flex-row gap-4 justify-between items-center text-sm">
                    <p className="text-slate-500 text-xs md:text-sm order-2 sm:order-1">
                        Showing{" "}
                        <span className="text-white font-bold">{start}</span>-
                        <span className="text-white font-bold">{end}</span> of{" "}
                        <span className="text-white font-bold">
                            {totalItems}
                        </span>
                    </p>

                    <div className="flex gap-1 md:gap-2 order-1 sm:order-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((p) => p - 1)}
                            className={`w-8 h-8 flex items-center justify-center rounded border border-brand-border transition-colors ${
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
                                                ? "border-brand-blue bg-brand-blue text-white font-bold shadow-lg shadow-blue-500/20"
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
                            className={`w-8 h-8 flex items-center justify-center rounded border border-brand-border transition-colors ${
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
                <AddSourceModal onClose={() => setIsModalOpen(false)} onSourceCreated={handleSourceCreated}/>
            )}
        </div>
    );
}
