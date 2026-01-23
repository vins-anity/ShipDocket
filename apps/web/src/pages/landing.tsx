import { IconShieldLock } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#0F172A] text-white overflow-hidden relative font-sans selection:bg-blue-500/30">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl" />

            {/* Navigation */}
            <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <IconShieldLock className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">Trail AI</span>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                    >
                        Sign In
                    </button>
                    <Button
                        onClick={() => navigate("/login")}
                        className="bg-white text-slate-900 hover:bg-slate-100 hover:scale-105 transition-all rounded-full px-6 font-semibold"
                    >
                        Get Started
                    </Button>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 pt-20 pb-32 px-6 max-w-7xl mx-auto text-center">
                {/* ... (skipping unchanged) ... */}
            </main>

            {/* Footer */}
            <footer className="border-t border-white/5 bg-[#0F172A]">
                <div className="max-w-7xl mx-auto py-12 px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <IconShieldLock className="h-5 w-5 text-slate-500" />
                        <span className="text-sm text-slate-500">© 2026 Trail AI Inc.</span>
                    </div>
                    <div className="flex gap-6 text-sm text-slate-400">
                        <a href="/" className="hover:text-white transition-colors">
                            Privacy
                        </a>
                        <a href="/" className="hover:text-white transition-colors">
                            Terms
                        </a>
                        <a href="/" className="hover:text-white transition-colors">
                            Status
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
