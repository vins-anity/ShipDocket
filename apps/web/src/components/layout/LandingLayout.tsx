import type { ReactNode } from "react";
import { LandingFooter } from "../landing/footer";
import { LandingNav } from "../landing/header";

interface LandingLayoutProps {
    children: ReactNode;
}

export function LandingLayout({ children }: LandingLayoutProps) {
    return (
        <div className="min-h-screen bg-background font-sans antialiased flex flex-col">
            <LandingNav />
            <main className="flex-1">{children}</main>
            <LandingFooter />
        </div>
    );
}
