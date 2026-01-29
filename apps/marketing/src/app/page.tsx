import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-brand-light text-brand-dark overflow-hidden">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 px-6 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-accent-orange rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-accent-blue rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gray-light/50 border border-brand-gray-mid/30 text-sm font-medium text-brand-dark animate-fade-in">
                        <span className="flex h-2 w-2 rounded-full bg-brand-accent-green"></span>
                        The Logistics of Trust for Software
                    </div>

                    <h1 className="text-6xl md:text-8xl font-heading font-bold tracking-tight text-brand-dark leading-[1.1] animate-slide-up">
                        Turn Commits <br className="hidden md:block" />
                        into <span className="text-brand-accent-orange">Contracts</span>.
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
                        Automate your delivery verification. ShipDocket proves your work meets the spec, every single time.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                        <Link href="http://localhost:5173/onboarding">
                            <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-brand-dark text-brand-light hover:bg-brand-accent-orange transition-colors">
                                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-brand-gray-mid hover:bg-white hover:text-brand-dark hover:border-brand-dark transition-colors">
                            Read the Manifesto
                        </Button>
                    </div>
                </div>
            </section>

            {/* Social Proof / Trust Bar */}
            <section className="py-12 border-y border-brand-gray-mid/20 bg-white/50">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <p className="text-sm font-medium text-muted-foreground mb-8">TRUSTED BY FORWARD-THINKING AGENCIES</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholders for logos - implementing as accessible text for now */}
                        <div className="text-2xl font-heading font-bold">Acme Corp</div>
                        <div className="text-2xl font-heading font-bold">Globex</div>
                        <div className="text-2xl font-heading font-bold">Soylent</div>
                        <div className="text-2xl font-heading font-bold">Initech</div>
                    </div>
                </div>
            </section>

            {/* Value Props */}
            <section className="py-24 md:py-32 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-12">
                        {/* Feature 1 */}
                        <div className="space-y-4 p-8 rounded-3xl bg-brand-light border border-brand-gray-light hover:border-brand-accent-orange/50 transition-colors group">
                            <div className="h-12 w-12 rounded-2xl bg-brand-dark text-brand-light flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Zap className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold font-heading">Zero-Touch Ingestion</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                We hook directly into GitHub and Jira. No manual data entry. Your developers keep coding, we keep tracking.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="space-y-4 p-8 rounded-3xl bg-brand-light border border-brand-gray-light hover:border-brand-accent-blue/50 transition-colors group">
                            <div className="h-12 w-12 rounded-2xl bg-brand-dark text-brand-light flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <CheckCircle2 className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold font-heading">Automated Verification</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Define your "Definition of Done" once. We verify every PR against it automatically before it ships.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="space-y-4 p-8 rounded-3xl bg-brand-light border border-brand-gray-light hover:border-brand-accent-green/50 transition-colors group">
                            <div className="h-12 w-12 rounded-2xl bg-brand-dark text-brand-light flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold font-heading">Proof Packets</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Generate cryptographically signed release notes that prove exactly what was delivered and when.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
