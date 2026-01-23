import { Button } from "@/components/ui/button";
import { IconArrowRight, IconCheck, IconShieldLock, IconBrandGithub, IconBrandSlack, IconBrandJira } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

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
                    <button onClick={() => navigate("/login")} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
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
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 animate-fade-in-up">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-medium text-blue-200">v1.0 Now Available for Agencies</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent max-w-4xl mx-auto leading-tight">
                    Delivery Assurance for <br /> Software Agencies
                </h1>

                <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Stop fighting billing disputes with screenshots. Trail AI generates
                    <span className="text-white font-medium"> tamper-evident Proof Packets</span> from your metadata,
                    verifying every delivery completely passively.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
                    <Button
                        onClick={() => navigate("/login")}
                        size="lg"
                        className="h-14 px-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:shadow-lg hover:shadow-blue-500/25 transition-all text-lg font-semibold w-full sm:w-auto"
                    >
                        Start Auditing Free
                        <IconArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="h-14 px-8 rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm w-full sm:w-auto"
                    >
                        View Sample Packet
                    </Button>
                </div>

                {/* Dashboard Preview / Trust Grid */}
                <div className="relative mx-auto max-w-5xl rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl overflow-hidden p-1">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10" />
                    <div className="relative rounded-lg bg-[#0F172A]/80 overflow-hidden text-left p-6 md:p-10">
                        {/* Mock UI Elements representing the "Passive Handshake" */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
                            <div className="space-y-4">
                                <div className="h-10 w-10 rounded-lg bg-[#0052CC]/20 flex items-center justify-center text-[#0052CC]">
                                    <IconBrandJira className="h-6 w-6" />
                                </div>
                                <h3 className="font-semibold text-white">Passive Tracking</h3>
                                <p className="text-sm text-slate-400">We listen to Jira status changes. Your devs never have to click "Start Timer."</p>
                            </div>
                            <div className="space-y-4">
                                <div className="h-10 w-10 rounded-lg bg-[#24292F]/40 flex items-center justify-center text-white border border-white/10">
                                    <IconBrandGithub className="h-6 w-6" />
                                </div>
                                <h3 className="font-semibold text-white">Evidence Collection</h3>
                                <p className="text-sm text-slate-400">Commits, PRs, and CI passes are cryptographically hashed and chained.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="h-10 w-10 rounded-lg bg-[#E01E5A]/20 flex items-center justify-center text-[#E01E5A]">
                                    <IconBrandSlack className="h-6 w-6" />
                                </div>
                                <h3 className="font-semibold text-white">Optimistic Closure</h3>
                                <p className="text-sm text-slate-400">Work is auto-approved after 24h unless you Veto. Speed without risk.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-white/5 bg-[#0F172A]">
                <div className="max-w-7xl mx-auto py-12 px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <IconShieldLock className="h-5 w-5 text-slate-500" />
                        <span className="text-sm text-slate-500">© 2026 Trail AI Inc.</span>
                    </div>
                    <div className="flex gap-6 text-sm text-slate-400">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Status</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
