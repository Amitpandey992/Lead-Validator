import { Loader2 } from "lucide-react";

const StatCard = ({ title, value, loading, icon: Icon, color }: any) => {
    return (
        <div className="bg-brand-card/40 backdrop-blur-md p-6 rounded-2xl border border-brand-border hover:border-brand-blue/50 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-xl bg-brand-dark border border-brand-border group-hover:scale-110 transition-transform duration-300">
                    <Icon className={color} size={22} />
                </div>
            </div>

            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">
                {title}
            </p>

            {loading ? (
                <Loader2 className="animate-spin text-slate-500" size={24} />
            ) : (
                <h3 className="text-3xl font-bold text-white tracking-tight">
                    {value}
                </h3>
            )}
        </div>
    );
};

export default StatCard;
