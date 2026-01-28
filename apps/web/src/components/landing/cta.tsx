import { ArrowRightIcon } from "@radix-ui/react-icons";
import { IconCalendar, IconRocket } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function LandingCta() {
    return (
        <section className="relative py-24 overflow-hidden border-t border-border bg-card/50">
            <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
                <h2 className="text-5xl font-bold leading-tight">Ready to Ship?</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    See ShipDocket in action. Try our interactive demo or schedule a personalized
                    walkthrough with our team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Link to="/demo">
                        <Button size="lg" className="rounded-full px-8 gap-2">
                            <IconRocket className="w-4 h-4" />
                            Try Demo
                            <ArrowRightIcon className="w-4 h-4" />
                        </Button>
                    </Link>
                    <a
                        href="https://calendly.com/shipdocket/demo"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button
                            size="lg"
                            variant="outline"
                            className="rounded-full px-8 bg-transparent gap-2"
                        >
                            <IconCalendar className="w-4 h-4" />
                            Book a Demo
                        </Button>
                    </a>
                </div>
                <div className="pt-8 space-y-2 text-sm text-muted-foreground">
                    <p>
                        Questions? Email us at{" "}
                        <a
                            href="mailto:manifest@shipdocket.com"
                            className="text-primary hover:underline"
                        >
                            manifest@shipdocket.com
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}
