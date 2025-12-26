import { Megaphone, Info, Plus, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddSourceModal({ onClose, onSourceCreated }: any) {
    const { createSource } = useAuth();
    const [sourceName, setSourceName] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async () => {
        if (!sourceName) {
            toast.error("Source name is required");
            return;
        }

        try {
            setIsLoading(true);
            const response = await createSource(sourceName);
            if (response.success) {
                toast.success("Source created successfully");
                onSourceCreated(response.data);
                onClose();
            } else {
                toast.error("Failed to create source");
            }
        } catch (error) {
            toast.error("Failed to create source");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-brand-card border border-brand-border rounded-2xl w-full max-w-md shadow-2xl">
                <div className="p-6 flex justify-between items-center border-b border-brand-border">
                    <div>
                        <h2 className="text-xl font-bold text-white">
                            Add New Lead Source
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">
                            Enter a unique name to identify incoming leads.
                        </p>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                            Source Name
                        </label>
                        <div className="relative">
                            <Megaphone
                                className="absolute left-4 top-3.5 text-slate-500"
                                size={18}
                            />
                            <input
                                type="text"
                                placeholder="e.g. Facebook Ads, Referral, Organic Search"
                                className="w-full bg-brand-input border border-brand-blue/50 ring-1 ring-brand-blue/20 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-slate-600 outline-none"
                                value={sourceName}
                                onChange={(e) => setSourceName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="bg-brand-blue/10 border border-brand-blue/20 p-4 rounded-xl flex gap-3">
                        <Info className="text-brand-blue shrink-0" size={18} />
                        <p className="text-xs text-blue-200/70 leading-relaxed">
                            Sources help you track where your best leads are
                            coming from. Once created, you can assign this
                            source to any new lead manually or via API.
                        </p>
                    </div>
                </div>

                <div className="p-6 bg-slate-900/30 flex justify-end gap-3 rounded-b-2xl">
                    <button
                        className="px-6 py-2.5 bg-slate-800 border border-brand-border rounded-lg text-sm font-bold text-white hover:bg-slate-700 cursor-pointer"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-6 py-2.5 bg-brand-blue rounded-lg text-sm font-bold text-white flex items-center gap-2 shadow-lg shadow-blue-500/20 cursor-pointer"
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <>
                                <Plus size={18} /> <span>Create Source</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
