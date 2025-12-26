import { Menu } from "lucide-react";

export default function Header({ setSidebarOpen }: any) {
    return (
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-brand-border/10 bg-brand-background/80 px-4 backdrop-blur-md transition-all md:px-8">
            <div className="flex items-center gap-4">
                <button
                    className="group rounded-xl p-2.5 text-gray-400 transition-all hover:bg-white/10 hover:text-white lg:hidden"
                    onClick={() => setSidebarOpen(true)}
                    aria-label="Open Menu"
                >
                    <Menu
                        size={24}
                        className="transition-transform group-hover:scale-105"
                    />
                </button>
            </div>
        </header>
    );
}
