import {
    PersonIcon,
    CodeIcon,
    BarChartIcon,
    ExclamationTriangleIcon,
} from "@radix-ui/react-icons";

export function LandingProblem() {
    return (
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
    );
}
