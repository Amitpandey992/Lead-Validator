import { Loader2, ShieldCheck, Mail } from "lucide-react";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useRef } from "react";

export default function VerifyEmail() {
    const hasVerified = useRef(false);
    const { verifyEmail } = useAuth();
    const url = new URLSearchParams(window.location.search);
    const token = url.get("token");
    const navigate = useNavigate();

    const handleVerifyEmail = async () => {
        try {
            if (token) {
                const response = await verifyEmail(token);
                if (response.success) {
                    setTimeout(() => {
                        navigate("/dashboard");
                    }, 4000);
                }
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!token || hasVerified.current) return;

        hasVerified.current = true;
        handleVerifyEmail();
    }, [token]);

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="min-h-screen bg-brand-dark flex flex-col relative overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-blue/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />

            <div className="p-6 md:p-8 w-full relative z-10">
                <div className="flex items-center gap-2 max-w-7xl mx-auto">
                    <div className="w-8 h-8 flex items-center justify-center">
                        <div className="flex gap-0.5">
                            <div className="w-2 h-6 bg-white rounded-full"></div>
                            <div className="w-2 h-6 bg-white rounded-full opacity-60"></div>
                            <div className="w-2 h-6 bg-white rounded-full opacity-30"></div>
                        </div>
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">
                        LeadValidator
                    </span>
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center px-4 relative z-10">
                <div className="bg-brand-card/50 backdrop-blur-xl border border-brand-border rounded-3xl p-12 w-full max-w-md shadow-2xl flex flex-col items-center text-center">
                    <div className="relative mb-8">
                        <div className="absolute inset-0 rounded-full border-2 border-dashed border-brand-blue/30 animate-[spin_8s_linear_infinite]" />

                        <div className="w-24 h-24 bg-brand-blue/10 rounded-full flex items-center justify-center relative">
                            <Mail
                                className="text-brand-blue animate-pulse"
                                size={40}
                            />

                            <div className="absolute -right-1 -top-1 bg-brand-dark border border-brand-border p-1.5 rounded-lg shadow-lg">
                                <ShieldCheck
                                    className="text-emerald-500"
                                    size={18}
                                />
                            </div>
                        </div>
                    </div>

                    <h1 className="text-white text-2xl md:text-3xl font-bold mb-3 tracking-tight">
                        Verifying your email
                    </h1>

                    <div className="flex items-center gap-3 text-slate-400 font-medium">
                        <Loader2
                            className="animate-spin text-brand-blue"
                            size={20}
                        />
                        <p className="animate-pulse">
                            Securing your account...
                        </p>
                    </div>

                    <p className="text-[11px] text-slate-500 uppercase tracking-widest font-bold mt-8">
                        Please do not close this window
                    </p>
                </div>
            </div>
        </div>
    );
}
