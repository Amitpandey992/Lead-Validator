import {
    LayoutDashboard,
    Users,
    ShieldCheck,
    BarChart3,
    LogOut,
    X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";

export default function Sidebar({ sidebarOpen, setSidebarOpen }: any) {
    const { user, logout } = useAuth();

    const menu = [
        { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        {
            label: "Source Management",
            path: "/dashboard/source-management",
            icon: ShieldCheck,
        },
        { label: "Lead View", path: "/dashboard/leads", icon: Users },
    ];

    return (
        <>
            <div
                className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
                    sidebarOpen
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setSidebarOpen(false)}
            />

            <aside
                className={`
                    fixed inset-y-0 left-0 z-[70] flex w-72 flex-col 
                    border-r border-white/10 bg-brand-dark p-6 
                    transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
                    ${
                        sidebarOpen
                            ? "translate-x-0 shadow-2xl"
                            : "-translate-x-full"
                    }
                `}
            >
                <div className="mb-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20">
                            <BarChart3 className="text-white" size={20} />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">
                            Lead<span className="text-blue-500">Validate</span>
                        </span>
                    </div>
                    <button
                        className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white lg:hidden transition-colors"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 space-y-1.5 overflow-y-auto pr-2 custom-scrollbar">
                    {menu.map((item, i) => (
                        <NavLink
                            key={i}
                            to={item.path}
                            onClick={() => setSidebarOpen(false)}
                            end={item.path === "/dashboard"}
                            className={({ isActive }) =>
                                `group flex w-full items-center gap-3 rounded-xl p-3 text-sm font-medium transition-all duration-200 border ${
                                    isActive
                                        ? "border-blue-500/20 bg-blue-500/10 text-blue-400"
                                        : "border-transparent text-gray-400 hover:bg-white/5 hover:text-gray-100"
                                }`
                            }
                        >
                            <item.icon size={18} />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="mt-auto border-t border-white/10 pt-4 space-y-2">
                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 shadow-lg ring-1 ring-white/20">
                            <span className="text-xs font-bold text-white uppercase">
                                {user?.name?.slice(0, 2) || "AD"}
                            </span>
                        </div>
                        <div className="flex flex-col min-w-0">
                            <p className="truncate text-sm font-semibold text-white">
                                {user?.name || "Guest User"}
                            </p>
                            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                                Active Account
                            </p>
                        </div>
                    </div>

                    <button
                        className="group flex w-full items-center gap-3 rounded-xl p-3 text-sm font-medium text-gray-400 transition-all hover:bg-red-500/10 hover:text-red-400 cursor-pointer"
                        onClick={logout}
                    >
                        <LogOut
                            size={18}
                            className="text-gray-500 group-hover:text-red-400"
                        />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
