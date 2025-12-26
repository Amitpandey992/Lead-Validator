import { Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Login() {
    const navigate = useNavigate();
    const { isLoading, login } = useAuth();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("All fields are required");
            return;
        }

        try {
            const response = await login(email, password);

            if (response.success) {
                toast.success("Login successful");
                navigate("/dashboard");
            }
        } catch (error) {
            console.log(error);
            toast.error("Login failed, please try again.");
        }
    };
    return (
        <div className="min-h-screen bg-brand-dark">
            <div className="p-4 md:p-8 w-full">
                <div className="flex items-center gap-2 max-w-7xl mx-auto">
                    <div className="w-8 h-8 flex items-center justify-center">
                        <div className="flex gap-0.5">
                            <div className="w-2 h-6 bg-white rounded-full"></div>
                            <div className="w-2 h-6 bg-white rounded-full opacity-60"></div>
                            <div className="w-2 h-6 bg-white rounded-full opacity-30"></div>
                        </div>
                    </div>
                    <span className="text-xl font-bold text-white">
                        LeadValidator
                    </span>
                </div>
            </div>

            <div className="w-full max-w-md mx-auto px-6 pt-10 pb-6 md:pt-6">
                <div className="text-center mb-8 md:mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                        Welcome Back!
                    </h1>
                    <p className="text-slate-400 text-sm md:text-base">
                        Login to your account.
                    </p>
                </div>

                <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-brand-border"></div>
                    </div>
                    <div className="relative flex justify-center text-[10px] md:text-xs uppercase">
                        <span className="bg-brand-dark px-4 text-slate-500 font-bold tracking-widest text-center">
                            continue with email login
                        </span>
                    </div>
                </div>

                <form onSubmit={handleSignIn} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-slate-300">
                            Work Email
                        </label>
                        <input
                            type="email"
                            placeholder="jane@company.com"
                            className="w-full bg-brand-input border border-brand-border rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 text-slate-300">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-brand-input border border-brand-border rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <p className="text-[11px] md:text-xs text-slate-500 mt-2">
                            Must be at least 6 characters.
                        </p>
                    </div>

                    <button
                        className="w-full bg-brand-blue text-white font-bold py-3.5 md:py-4 rounded-lg mt-4 shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-transform hover:cursor-pointer flex items-center justify-center"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin h-4 w-4" />
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-blue-500 mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="underline font-medium cursor-pointer"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
