import { Mail, CheckCircle, X, Phone, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { Source } from "../shared/types";

export default function LeadEntryModal({ onClose, onLeadAdded }: any) {
    const { manualValidateLead, getUserSources } = useAuth();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [sourceName, setSourceName] = useState("");
    const [sourceId, setSourceId] = useState("");
    const [sources, setSources] = useState<Source[]>([]);

    const handleSubmit = async () => {
        setLoading(true);
        if (!email || !phone || !sourceId) {
            toast.error("Please fill all fields");
            setLoading(false);
            return;
        }
        if (!sourceName) {
            toast.error("Please select a source");
            setLoading(false);
            return;
        }
        if (phone.length < 10 || phone.length > 10) {
            toast.error("Phone number must be 10 digits");
            setLoading(false);
            return;
        }
        try {
            const response = await manualValidateLead(sourceId, email, phone);
            if (response.success) {
                toast.success("Lead added successfully");
                const createdLead = {
                    ...response.data.lead,
                    source: sources.find((s) => s.sourceId === sourceId),
                };

                onLeadAdded(createdLead);
                onClose();
            }
        } catch (error) {
            toast.error("Failed to add lead");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserSources(1, 1000).then((res) => {
            if (res.success) {
                setSources(res.data.sources);
            }
        });
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <div className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl border border-brand-border bg-brand-card shadow-2xl">
                <div className="flex items-center justify-between border-b border-brand-border p-5 md:px-8">
                    <div>
                        <h2 className="text-xl font-bold text-white">
                            Manual Lead Entry
                        </h2>
                        <p className="mt-1 text-xs text-slate-400">
                            Enter prospect details below to validate and add to
                            the pipeline.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5 md:p-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400">
                                Email Address
                            </label>
                            <div className="relative group">
                                <Mail
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-blue transition-colors"
                                    size={18}
                                />
                                <input
                                    type="email"
                                    placeholder="prospect@company.com"
                                    className="w-full rounded-xl border border-brand-blue/30 bg-brand-input py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-slate-600 outline-none ring-1 ring-brand-blue/10 focus:ring-2 focus:ring-brand-blue/50 transition-all"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400">
                                Phone Number
                            </label>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="relative flex-1 group">
                                    <Phone
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-blue transition-colors"
                                        size={18}
                                    />
                                    <input
                                        type="text"
                                        placeholder="(555) 000-0000"
                                        className="w-full rounded-xl border border-brand-blue/30 bg-brand-input py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-slate-600 outline-none ring-1 ring-brand-blue/10 focus:ring-2 focus:ring-brand-blue/50 transition-all"
                                        value={phone}
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400">
                                Source Name
                            </label>
                            <div className="relative group">
                                <select
                                    className="w-full rounded-xl border border-brand-blue/30 bg-brand-input py-3.5 pl-4 pr-4 text-sm text-white"
                                    value={sourceId}
                                    onChange={(e) => {
                                        const selected = sources.find(
                                            (s) => s.sourceId === e.target.value
                                        );
                                        if (selected) {
                                            setSourceId(selected.sourceId);
                                            setSourceName(selected.sourceName);
                                        } else {
                                            setSourceId("");
                                            setSourceName("");
                                        }
                                    }}
                                >
                                    <option value="">Select Source</option>
                                    {sources.map((source) => (
                                        <option
                                            key={source.sourceId}
                                            value={source.sourceId}
                                        >
                                            {source.sourceName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 border-t border-brand-border bg-slate-900/40 p-5 md:px-8">
                    <button
                        onClick={onClose}
                        className="w-full sm:w-auto cursor-pointer rounded-xl border border-brand-border bg-transparent px-6 py-3 text-sm font-bold text-slate-300 transition-all hover:bg-slate-800 hover:text-white"
                    >
                        Cancel
                    </button>
                    <button
                        className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-brand-blue px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-600 active:scale-[0.98] cursor-pointer"
                        disabled={loading}
                        onClick={handleSubmit}
                    >
                        {loading ? (
                            <Loader2 size={18} className="animate-spin" />
                        ) : (
                            <>
                                <CheckCircle size={18} />{" "}
                                <span>Validate & Add Lead</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
