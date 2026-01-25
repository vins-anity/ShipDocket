import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircledIcon } from "@radix-ui/react-icons";

export function LandingFeatures() {
    return (
        <section id="features" className="max-w-6xl mx-auto px-6 py-24 space-y-16">
            <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold">How Trail AI Works</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    A four-stage workflow that captures intent, automates evidence, and produces
                    audit-ready receipts.
                </p>
            </div>

            <div className="space-y-8">
                {/* Stage 1 */}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <Badge>Stage 1</Badge>
                        <h3 className="text-2xl font-bold">
                            Passive Handshake: Explicit Acceptance
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                            A developer moves a ticket in Jira or accepts a task in Slack. This
                            automatically logs a formal commitment. The developer can
                            "Reject" via a simple button if assigned in error.
                        </p>
                        <ul className="space-y-2 text-sm">
                            <li className="flex gap-2">
                                <CheckCircledIcon className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                <span>Prevents misaligned expectations</span>
                            </li>
                            <li className="flex gap-2">
                                <CheckCircledIcon className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                <span>Creates first audit entry</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-card rounded-xl border border-border p-8 space-y-3">
                        <div className="font-mono text-sm text-muted-foreground bg-background rounded p-3">
                            Slack: "John, can you fix login timeout?"
                            <br />
                            <span className="text-green-600">✓ John accepted task</span>
                            <br />
                            <span className="text-xs text-muted-foreground mt-2 block">
                                2026-01-10 14:30 UTC
                            </span>
                        </div>
                    </div>
                </div>

                {/* Stage 2 */}
                <div className="grid md:grid-cols-2 gap-8 items-center md:order-2">
                    <div className="space-y-4 md:order-2">
                        <Badge>Stage 2</Badge>
                        <h3 className="text-2xl font-bold">Execute: Evidence Auto-Collection</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Trail AI monitors GitHub webhooks. When code merges, reviews are
                            approved, and CI passes—all evidence is captured automatically. No
                            manual status updates.
                        </p>
                        <ul className="space-y-2 text-sm">
                            <li className="flex gap-2">
                                <CheckCircledIcon className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                <span>PR merged + reviewed + tested</span>
                            </li>
                            <li className="flex gap-2">
                                <CheckCircledIcon className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                <span>All metadata timestamped</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-card rounded-xl border border-border p-8 space-y-2 md:order-1">
                        <div className="text-xs font-semibold text-muted-foreground uppercase">
                            Evidence Summary
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 p-2 bg-background rounded">
                                <CheckCircledIcon className="w-4 h-4 text-green-600" />
                                <span>PR #123 merged</span>
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-background rounded">
                                <CheckCircledIcon className="w-4 h-4 text-green-600" />
                                <span>1 approval received</span>
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-background rounded">
                                <CheckCircledIcon className="w-4 h-4 text-green-600" />
                                <span>CI checks passed</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stage 3 */}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <Badge>Stage 3</Badge>
                        <h3 className="text-2xl font-bold">
                            Optimistic Closure: Human-in-the-Loop
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Once policy is met (PR merged + approvals + CI passing), Trail AI
                            proposes closure. It auto-approves after a set window (e.g., 24h)
                            unless a lead vetoes it. Speed with control.
                        </p>
                        <ul className="space-y-2 text-sm">
                            <li className="flex gap-2">
                                <CheckCircledIcon className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                <span>Auto-close timer (e.g. 24h)</span>
                            </li>
                            <li className="flex gap-2">
                                <CheckCircledIcon className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                <span>Manager veto stops closure</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-card rounded-xl border border-border p-8 space-y-3">
                        <div className="text-xs font-semibold text-muted-foreground uppercase">
                            Lead Approval Gate
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm font-medium">
                                Auto-closing in 23h 45m...
                            </p>
                            <div className="flex gap-2">
                                <Button size="sm" className="flex-1">
                                    Approve Now
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="flex-1 bg-transparent"
                                >
                                    Veto & Explain
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stage 4 */}
                <div className="grid md:grid-cols-2 gap-8 items-center md:order-2">
                    <div className="space-y-4 md:order-2">
                        <Badge>Stage 4</Badge>
                        <h3 className="text-2xl font-bold">
                            Proof Packet: AI-Enhanced Receipt
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Generate a shareable, tamper-evident Proof Packet. OpenRouter AI
                            transforms technical logs into business-readable summaries. Prove
                            exactly what was delivered.
                        </p>
                        <ul className="space-y-2 text-sm">
                            <li className="flex gap-2">
                                <CheckCircledIcon className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                <span>Web, PDF, JSON export</span>
                            </li>
                            <li className="flex gap-2">
                                <CheckCircledIcon className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                <span>Hash-chain integrity verification</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-card rounded-xl border border-border p-8 space-y-3 md:order-1">
                        <div className="text-xs font-semibold text-muted-foreground uppercase">
                            Proof Packet Preview
                        </div>
                        <div className="space-y-2 text-xs text-muted-foreground font-mono bg-background rounded p-3">
                            <div>PP-PROJ-101-20260112</div>
                            <div className="text-foreground font-semibold">
                                Fix login timeout
                            </div>
                            <div className="text-xs text-gray-500 italic my-1">
                                "Resolved session expiry issue ensuring users stay logged in for
                                extended duration."
                            </div>
                            <div>Approved by sarah@example.com</div>
                            <div>Jan 11, 2026 10:15 AM UTC</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
