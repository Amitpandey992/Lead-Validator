import { Users, ShieldCheck, ShieldAlert } from "lucide-react";
import StatCard from "./StatCard";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import type { Lead } from "../../shared/types";

export default function StatsGrid() {
    const { getLeads } = useAuth();
    const [loading, setLoading] = useState(false);

    const [totalLeads, setTotalLeads] = useState(0);
    const [validLeads, setValidLeads] = useState(0);
    const [invalidLeads, setInvalidLeads] = useState(0);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const response = await getLeads(1, 1000);
                const leads: Lead[] = response.data.leads;

                setTotalLeads(response.data.totalItems);
                setValidLeads(
                    leads.filter((l) => l.validationStatus === "valid").length
                );
                setInvalidLeads(
                    leads.filter((l) => l.validationStatus === "invalid").length
                );
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            <StatCard
                title="Total Leads"
                value={totalLeads}
                loading={loading}
                icon={Users}
                color="text-brand-blue"
            />
            <StatCard
                title="Validated"
                value={validLeads}
                loading={loading}
                icon={ShieldCheck}
                color="text-green-500"
            />
            <StatCard
                title="Invalid"
                value={invalidLeads}
                loading={loading}
                icon={ShieldAlert}
                color="text-red-500"
            />
        </div>
    );
}
