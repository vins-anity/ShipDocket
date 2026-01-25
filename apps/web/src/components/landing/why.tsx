import { PersonIcon, LockClosedIcon } from "@radix-ui/react-icons";

export function LandingWhy() {
    return (
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
    );
}
