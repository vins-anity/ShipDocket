import { LandingCta } from "../components/landing/cta";
import { LandingFaq } from "../components/landing/faq";
import { LandingFeatures } from "../components/landing/features";
import { LandingFooter } from "../components/landing/footer";
import { LandingNav } from "../components/landing/header";
import { LandingHero } from "../components/landing/hero";
import { LandingProblem } from "../components/landing/problem";
import { LandingWhy } from "../components/landing/why";

export function LandingPage() {
    return (
        <main className="min-h-screen bg-background text-foreground font-sans">
            <LandingNav />
            <LandingHero />
            <LandingProblem />
            <LandingFeatures />
            <LandingWhy />
            <LandingFaq />
            <LandingCta />
            <LandingFooter />
        </main>
    );
}
