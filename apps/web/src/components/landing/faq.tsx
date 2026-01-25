import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export function LandingFaq() {
    const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

    const faqs = [
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
    ];

    return (
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
                    {faqs.map((faq, idx) => (
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
    );
}
