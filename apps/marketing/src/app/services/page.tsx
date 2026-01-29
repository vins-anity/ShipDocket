import { Badge } from "@/components/ui/badge";
import { GitCommit, SearchCheck, FileSignature } from "lucide-react";

export default function ServicesPage() {
    return (
        <div className="bg-brand-light min-h-screen py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-24 space-y-6">
                    <Badge className="bg-brand-dark text-brand-light hover:bg-brand-accent-blue px-6 py-2 rounded-full text-sm">HOW IT WORKS</Badge>
                    <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 tracking-tight text-brand-dark">
                        The Delivery Supply Chain
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
                        End-to-end verification for your software factory. From <span className="font-semibold text-brand-accent-orange">commit</span> to <span className="font-semibold text-brand-accent-green">cash</span>.
                    </p>
                </div>

                <div className="space-y-32 relative">
                    {/* Vertical Line Connector (Optional Visual Aid) */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-brand-gray-mid/30 hidden md:block -z-10"></div>

                    {/* Stage 1 */}
                    <div className="md:grid md:grid-cols-2 gap-24 items-center group">
                        <div className="space-y-8 order-2 md:order-1 text-right md:pr-12">
                            <div className="inline-block p-3 rounded-2xl bg-brand-accent-orange/10 text-brand-accent-orange mb-4">
                                <GitCommit className="w-8 h-8" />
                            </div>
                            <h2 className="text-4xl font-heading font-bold text-brand-dark">Passive Ingestion</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                We hook into your existing tools (GitHub, Jira). No manual data entry required. We silently observe the work moving through your pipeline.
                            </p>
                            <ul className="space-y-3 text-sm text-foreground inline-block text-left">
                                <li className="flex items-center gap-3"><span className="text-brand-accent-green">✓</span> Detects PR merges</li>
                                <li className="flex items-center gap-3"><span className="text-brand-accent-green">✓</span> Links Jira tickets</li>
                                <li className="flex items-center gap-3"><span className="text-brand-accent-green">✓</span> Captures build status</li>
                            </ul>
                        </div>
                        <div className="order-1 md:order-2">
                            {/* Visual Representation */}
                            <div className="bg-white p-2 rounded-3xl border border-brand-gray-light shadow-2xl shadow-brand-gray-light/50 transform group-hover:scale-105 transition-transform duration-500">
                                <div className="bg-brand-light aspect-video rounded-2xl flex items-center justify-center border border-dashed border-brand-gray-mid">
                                    <span className="text-brand-gray-mid font-medium">System Digestion UI</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stage 2 */}
                    <div className="md:grid md:grid-cols-2 gap-24 items-center group">
                        <div className="order-1">
                            <div className="bg-white p-2 rounded-3xl border border-brand-gray-light shadow-2xl shadow-brand-gray-light/50 transform group-hover:scale-105 transition-transform duration-500">
                                <div className="bg-brand-dark aspect-video rounded-2xl flex items-center justify-center border border-brand-gray-mid/20">
                                    <span className="text-brand-gray-mid font-medium">Verification Matrix UI</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-8 order-2 pl-12">
                            <div className="inline-block p-3 rounded-2xl bg-brand-accent-blue/10 text-brand-accent-blue mb-4">
                                <SearchCheck className="w-8 h-8" />
                            </div>
                            <h2 className="text-4xl font-heading font-bold text-brand-dark">The "Docket" Engine</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Our Verification Engine checks the evidence against your policy. It's not just "done", it's <span className="italic text-brand-dark font-medium">verified</span> done.
                            </p>
                            <ul className="space-y-3 text-sm text-foreground">
                                <li className="flex items-center gap-3"><span className="text-brand-accent-blue">✓</span> "Is code reviewed?"</li>
                                <li className="flex items-center gap-3"><span className="text-brand-accent-blue">✓</span> "Did tests pass?"</li>
                                <li className="flex items-center gap-3"><span className="text-brand-accent-blue">✓</span> "Is it deployed?"</li>
                            </ul>
                        </div>
                    </div>

                    {/* Stage 3 */}
                    <div className="md:grid md:grid-cols-2 gap-24 items-center group">
                        <div className="space-y-8 order-2 md:order-1 text-right md:pr-12">
                            <div className="inline-block p-3 rounded-2xl bg-brand-accent-green/10 text-brand-accent-green mb-4">
                                <FileSignature className="w-8 h-8" />
                            </div>
                            <h2 className="text-4xl font-heading font-bold text-brand-dark">Proof Packet Generation</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                We mint a cryptographically signed Proof Packet that you can share with clients. It's the ultimate receipt for your intellectual work.
                            </p>
                            <ul className="space-y-3 text-sm text-foreground inline-block text-left">
                                <li className="flex items-center gap-3"><span className="text-brand-accent-orange">✓</span> Public Share Links</li>
                                <li className="flex items-center gap-3"><span className="text-brand-accent-orange">✓</span> PDF Exports</li>
                                <li className="flex items-center gap-3"><span className="text-brand-accent-orange">✓</span> Client-friendly summaries</li>
                            </ul>
                        </div>
                        <div className="order-1 md:order-2">
                            <div className="bg-white p-2 rounded-3xl border border-brand-gray-light shadow-2xl shadow-brand-gray-light/50 transform group-hover:scale-105 transition-transform duration-500">
                                <div className="bg-brand-light aspect-video rounded-2xl flex items-center justify-center border border-dashed border-brand-gray-mid">
                                    <span className="text-brand-gray-mid font-medium">Final Packet Preview</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
