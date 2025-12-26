import { Mail, Info } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function CheckInbox() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-brand-dark flex flex-col">
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

            <div className="flex-1 flex items-center justify-center px-4">
                <div className="bg-brand-card border border-brand-border rounded-2xl md:rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
                    <div className="p-6 md:p-12 text-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-blue/20 rounded-full flex items-center justify-center">
                                <Mail className="text-brand-blue" size={28} />
                            </div>
                        </div>

                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Check your inbox
                        </h1>
                        <p className="text-slate-400 mb-2 leading-relaxed text-sm md:text-base">
                            We've sent a secure verification link to{" "}
                            <br className="hidden md:block" />
                            <span className="text-white font-bold px-1">
                                {user?.email}
                            </span>
                            . Please click the link to confirm your address and
                            activate your account.
                        </p>

                        <div className="flex items-start md:items-center justify-center gap-2 text-xs text-slate-500 mt-6">
                            <Info
                                size={14}
                                className="mt-0.5 md:mt-0 shrink-0"
                            />
                            <span>Can't find it? Check your spam folder.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
