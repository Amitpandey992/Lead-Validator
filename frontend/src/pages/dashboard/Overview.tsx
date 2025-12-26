import RecentLeadsList from "../../components/Dashboard/RecentLeadsList";
import StatsGrid from "../../components/Dashboard/StatsGrid";

export default function Overview() {
    return (
        <div className="bg-brand-dark min-h-screen p-4 sm:p-6 md:p-10 text-slate-300">
            <section className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Overview
                </h2>
                <p className="text-sm md:text-base text-slate-500 mt-1">
                    Daily acquisition performance summary.
                </p>
            </section>
            <StatsGrid />
            <RecentLeadsList />
        </div>
    );
}
