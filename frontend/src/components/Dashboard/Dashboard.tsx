import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-brand-dark text-slate-300 overflow-hidden">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
                <Header setSidebarOpen={setSidebarOpen} />

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="p-4 sm:p-6 md:p-10">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
}
