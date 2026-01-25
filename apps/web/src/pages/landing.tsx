import {
    ArrowRightIcon,
    CheckCircledIcon,
    LockClosedIcon,
    PersonIcon,
    BarChartIcon,
    CodeIcon,
    ExclamationTriangleIcon,
    ChevronDownIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function LandingPage() {
    const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

    return (
        <main className="min-h-screen bg-background text-foreground font-sans">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                            <LockClosedIcon className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <span className="font-semibold text-lg">Trail AI</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <a
                            href="#features"
                            className="text-sm text-muted-foreground hover:text-foreground transition"
                        >
                            How It Works
                        </a>
                        <a
                            href="#pricing"
                            className="text-sm text-muted-foreground hover:text-foreground transition"
                        >
                            Pricing
                        </a>
                        <a
                            href="#faq"
                            className="text-sm text-muted-foreground hover:text-foreground transition"
                        >
                            FAQ
                        </a>
                        <Button size="sm">Get Started</Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-20">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-40 left-10 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
                    {/* Left column: Headline and CTA */}
                    <div className="flex flex-col space-y-8">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] text-balance">
                            <span className="block">Stop</span>
                            <span className="block text-primary">Proving</span>
                            <span className="block">Nothing.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl font-light">
                            Proof Packets end billing disputes instantly. Your work is documented,
                            authorized, and client-ready—automatically. Using AI-Enhanced summaries
                            and Optimistic Closure.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <Button
                                size="lg"
                                className="gap-2 rounded-full px-8 text-base font-semibold w-fit"
                            >
                                Start Free Trial <ArrowRightIcon className="w-4 h-4" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="rounded-full px-8 text-base font-semibold bg-transparent w-fit"
                            >
                                Watch Demo (2 min)
                            </Button>
                        </div>

                        <div className="border-t border-border/30 pt-6 text-sm text-muted-foreground">
                            <p className="font-medium">
                                Trusted by 200+ agencies • 50K+ proof packets generated
                            </p>
                        </div>
                    </div>

                    {/* Right column: Proof Packet Visual Example */}
                    <div className="relative hidden md:flex items-center justify-center">
                        <div className="relative w-full max-w-sm">
                            {/* Glow background */}
                            <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent rounded-2xl blur-2xl opacity-60 animate-pulse" />

                            {/* Main card */}
                            <div className="relative bg-card border-2 border-primary/30 rounded-2xl p-8 space-y-6 shadow-2xl">
                                {/* Header */}
                                <div className="space-y-2 pb-4 border-b border-border/30">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-mono font-semibold text-primary uppercase tracking-wider">
                                            Proof Packet
                                        </span>
                                        <LockClosedIcon className="w-4 h-4 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground">
                                        PP-PROJ-2847
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Authentication System Overhaul
                                    </p>
                                </div>

                                {/* Status Badge */}
                                <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg w-fit">
                                    <CheckCircledIcon className="w-4 h-4 text-primary" />
                                    <span className="text-xs font-semibold text-primary">
                                        VERIFIED & APPROVED
                                    </span>
                                </div>

                                {/* Details Grid */}
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <p className="text-xs font-semibold text-muted-foreground uppercase">
                                            Assigned to
                                        </p>
                                        <p className="text-sm font-medium text-foreground">
                                            Sarah Chen • Lead Engineer
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-semibold text-muted-foreground uppercase">
                                            Completion Date
                                        </p>
                                        <p className="text-sm font-medium text-foreground">
                                            January 10, 2026 • 3:45 PM UTC
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-semibold text-muted-foreground uppercase">
                                            Approved By
                                        </p>
                                        <p className="text-sm font-medium text-foreground">
                                            Mike Thompson • Project Manager
                                        </p>
                                    </div>
                                </div>

                                {/* Evidence Summary */}
                                <div className="bg-background rounded-lg p-4 space-y-2">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">
                                        Evidence Summary
                                    </p>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-xs">
                                            <div className="w-2 h-2 rounded-full bg-green-600" />
                                            <span className="text-muted-foreground">
                                                PR #847 merged with 2 approvals
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs">
                                            <div className="w-2 h-2 rounded-full bg-green-600" />
                                            <span className="text-muted-foreground">
                                                All CI checks passed
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs">
                                            <div className="w-2 h-2 rounded-full bg-green-600" />
                                            <span className="text-muted-foreground">
                                                Code review completed
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs">
                                            <div className="w-2 h-2 rounded-full bg-green-600" />
                                            <span className="text-muted-foreground">
                                                Hash chain verified
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="border-t border-border/30 pt-4">
                                    <p className="text-xs text-muted-foreground font-mono">
                                        Hash: <span className="text-primary">a7f3e9c2...</span>
                                    </p>
                                </div>
                            </div>

                            {/* Decorative element */}
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
                    <span className="text-xs text-muted-foreground">Scroll to explore</span>
                    <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex items-start justify-center pt-2">
                        <div className="w-1 h-2 bg-muted-foreground rounded-full" />
                    </div>
                </div>
            </section>

            {/* Problem Section */}
            <section className="bg-card border-t border-b border-border py-20">
                <div className="max-w-6xl mx-auto px-6 space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-bold">The Execution Gap</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Without proof, delivery devolves into finger-pointing. Clients question
                            completion. Managers lose visibility.
                        </p>
                    </div>

                    <div className="space-y-6 max-w-3xl mx-auto relative">
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent leading-3" />

                        <div className="flex gap-6 pb-8">
                            <div className="relative flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                                <PersonIcon className="w-5 h-5 text-primary" />
                            </div>
                            <div className="space-y-2 pt-2">
                                <h3 className="font-semibold text-lg">Task Accepted in Slack</h3>
                                <p className="text-muted-foreground text-sm">
                                    Developer commits to work but there's no formal record.
                                    Intention lives in Slack—fleeting, searchable but not
                                    authoritative.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-6 pb-8">
                            <div className="relative flex-shrink-0 w-12 h-12 rounded-full bg-muted border-2 border-muted-foreground flex items-center justify-center">
                                <CodeIcon className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div className="space-y-2 pt-2">
                                <h3 className="font-semibold text-lg">Work Happens in GitHub</h3>
                                <p className="text-muted-foreground text-sm">
                                    Code merges, tests pass, reviews complete. But who authorized
                                    it? Managers scramble across PR comments, Jira, and Slack to
                                    piece together the story.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-6 pb-8">
                            <div className="relative flex-shrink-0 w-12 h-12 rounded-full bg-muted border-2 border-muted-foreground flex items-center justify-center">
                                <BarChartIcon className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div className="space-y-2 pt-2">
                                <h3 className="font-semibold text-lg">
                                    Status Lost in Translation
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                    "Is it done?" becomes a question. Jira is stale. Slack is
                                    archived. GitHub shows code but not commitment. Nobody trusts
                                    the answer.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="relative flex-shrink-0 w-12 h-12 rounded-full bg-destructive/20 border-2 border-destructive flex items-center justify-center">
                                <ExclamationTriangleIcon className="w-5 h-5 text-destructive" />
                            </div>
                            <div className="space-y-2 pt-2">
                                <h3 className="font-semibold text-lg">Billing Dispute Erupts</h3>
                                <p className="text-muted-foreground text-sm">
                                    Client says they never approved final work. You have no single
                                    proof document. Days lost arguing over evidence that should have
                                    been obvious.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How Trail AI Works Section */}
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

            {/* Why Section */}
            <section className="relative py-24 overflow-hidden border-t border-border bg-card/50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="text-5xl font-bold leading-tight">
                                Why We Built Trail AI
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                After 10 years of running a software agency, we watched billing
                                disputes destroy relationships and waste weeks of management time.
                                We knew there had to be a better way.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Trail AI is the result: a system that automatically proves what
                                you've delivered and who approved it. It's not about distrust—it's
                                about clarity. Proof eliminates arguments before they start.
                            </p>
                            <div className="space-y-4 pt-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                                        <PersonIcon className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">
                                            Built by Agency Founders
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            We lived your pain.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                                        <LockClosedIcon className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">
                                            Enterprise-Grade Security
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            SOC 2, HIPAA, compliance ready.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-primary/10 to-background border border-primary/20 rounded-2xl p-12 flex items-center justify-center min-h-96">
                            <div className="text-center space-y-4">
                                <LockClosedIcon className="w-24 h-24 text-primary mx-auto opacity-20" />
                                <p className="text-muted-foreground">
                                    200+ agencies trust Trail AI
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="relative py-24 overflow-hidden border-t border-border">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center space-y-6 mb-16">
                        <h2 className="text-5xl font-bold leading-tight">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Everything you need to know about Trail AI.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                q: "How long does it take to set up Trail AI?",
                                a: "About 5 minutes. Just connect your Slack workspace, Jira instance, and GitHub repo. Trail AI handles the rest automatically.",
                            },
                            {
                                q: "Do I need to change how my team works?",
                                a: "No. Your developers continue using Slack and GitHub exactly as before. Trail AI operates silently in the background, capturing and organizing evidence.",
                            },
                            {
                                q: "Can I customize the proof packet format?",
                                a: "Yes. Export as web-shareable link, PDF with your branding, or JSON for integration into your own systems. Enterprise customers get white-label options.",
                            },
                            {
                                q: "Is my data secure?",
                                a: "Absolutely. We are SOC 2 Type II certified, HIPAA compliant, and use hash-chain immutability to ensure proof packets cannot be tampered with.",
                            },
                            {
                                q: "What if my team uses Asana, Linear, or other tools?",
                                a: "We currently support Slack, Jira, and GitHub. Custom integrations are available for Enterprise customers. Reach out to our sales team.",
                            },
                            {
                                q: "Can I cancel anytime?",
                                a: "Yes. No long-term contracts. You can cancel your subscription at any time, and your data exports immediately.",
                            },
                        ].map((faq, idx) => (
                            <div
                                key={idx}
                                className="border border-border/50 rounded-lg overflow-hidden hover:border-primary/50 transition-colors"
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        setExpandedFaq(expandedFaq === idx ? null : idx)
                                    }
                                    className="w-full px-6 py-4 flex items-center justify-between bg-card/50 hover:bg-card transition-colors"
                                >
                                    <h3 className="font-semibold text-left">{faq.q}</h3>
                                    <ChevronDownIcon
                                        className={`w-5 h-5 text-muted-foreground transition-transform ${expandedFaq === idx ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>
                                {expandedFaq === idx && (
                                    <div className="px-6 py-4 text-muted-foreground leading-relaxed border-t border-border/30 bg-background/50">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="relative py-24 overflow-hidden border-t border-border bg-card/50">
                <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
                    <h2 className="text-5xl font-bold leading-tight">
                        Ready to Stop Proving Nothing?
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Join 200+ agencies delivering proof with every deliverable. Start your free
                        trial today—no credit card required.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Button size="lg" className="rounded-full px-8">
                            Start 30-Day Free Trial{" "}
                            <ArrowRightIcon className="w-4 h-4 ml-2" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="rounded-full px-8 bg-transparent"
                        >
                            Schedule a Demo
                        </Button>
                    </div>
                    <div className="pt-8 space-y-2 text-sm text-muted-foreground">
                        <p>
                            Questions? Email us at hello@trail-ai.com or call +1 (555) 123-4567
                        </p>
                        <p>Available 9am–6pm EST, Monday–Friday</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border bg-card">
                <div className="max-w-6xl mx-auto px-6 py-12">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                                    <LockClosedIcon className="w-5 h-5 text-primary-foreground" />
                                </div>
                                <span className="font-semibold">Trail AI</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Proof packets for agencies that deliver.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <h4 className="font-semibold text-sm">Product</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>
                                    <a
                                        href="#features"
                                        className="hover:text-foreground transition"
                                    >
                                        How It Works
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#pricing"
                                        className="hover:text-foreground transition"
                                    >
                                        Pricing
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-foreground transition"
                                    >
                                        Integrations
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h4 className="font-semibold text-sm">Company</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-foreground transition"
                                    >
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-foreground transition"
                                    >
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-foreground transition"
                                    >
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h4 className="font-semibold text-sm">Legal</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-foreground transition"
                                    >
                                        Privacy
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-foreground transition"
                                    >
                                        Terms of Service
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-foreground transition"
                                    >
                                        Security
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
                        <p>
                            Built by developers, for developers who ship. © 2026 Trail AI. All
                            rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </main>
    );
}
