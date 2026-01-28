import {
    IconArrowLeft,
    IconCheck,
    IconClock,
    IconDownload,
    IconFileText,
    IconLoader2,
    IconShieldCheck,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface SharedProof {
    id: string;
    taskId: string;
    status: string;
    aiSummary: string | null;
    aiSummaryModel: string | null;
    hashChainRoot: string | null;
    closedAt: string | null;
    createdAt: string;
    task: {
        key: string;
        summary: string;
    };
    events: Array<{
        id: string;
        eventType: string;
        createdAt: string;
    }>;
    workspace: {
        name: string;
    };
}

export function SharePage() {
    const { token } = useParams<{ token: string }>();

    const { data: proof, isLoading, error } = useQuery<SharedProof>({
        queryKey: ["shared-proof", token],
        queryFn: async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/proofs/share/${token}`);
            if (!res.ok) {
                throw new Error("Proof not found or expired");
            }
            return res.json();
        },
        enabled: !!token,
        retry: false,
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <IconLoader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-muted-foreground">Loading proof packet...</p>
                </div>
            </div>
        );
    }

    if (error || !proof) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
                <Card className="max-w-md w-full bg-card/50 backdrop-blur-sm border-white/10">
                    <CardContent className="pt-6 text-center">
                        <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                            <IconFileText className="h-8 w-8 text-destructive" />
                        </div>
                        <h2 className="text-xl font-bold text-foreground mb-2">
                            Proof Not Found
                        </h2>
                        <p className="text-muted-foreground mb-4">
                            This proof packet link may have expired or is invalid.
                        </p>
                        <Link to="/">
                            <Button variant="outline">
                                <IconArrowLeft className="h-4 w-4 mr-2" />
                                Go Home
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const statusColors: Record<string, string> = {
        draft: "bg-yellow-500/10 text-yellow-500",
        pending: "bg-orange-500/10 text-orange-500",
        finalized: "bg-green-500/10 text-green-500",
        exported: "bg-blue-500/10 text-blue-500",
    };

    const eventIcons: Record<string, React.ReactNode> = {
        handshake: "🤝",
        pr_opened: "📂",
        pr_merged: "✅",
        pr_approved: "👍",
        ci_passed: "🟢",
        ci_failed: "🔴",
        jira_status_changed: "📝",
        closure_approved: "✅",
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Header */}
            <header className="border-b border-white/10 bg-slate-900/50 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <IconFileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold text-white">Proof Packet</h1>
                            <p className="text-xs text-muted-foreground">
                                Shared by {proof.workspace?.name || "ShipDocket"}
                            </p>
                        </div>
                    </div>
                    <Badge className={statusColors[proof.status] || "bg-muted"}>
                        {proof.status.charAt(0).toUpperCase() + proof.status.slice(1)}
                    </Badge>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
                {/* Task Info */}
                <Card className="bg-card/50 backdrop-blur-sm border-white/10">
                    <CardHeader>
                        <CardTitle className="text-2xl">{proof.task?.key || proof.taskId}</CardTitle>
                        <CardDescription>
                            Created {new Date(proof.createdAt).toLocaleDateString()}
                            {proof.closedAt && ` • Closed ${new Date(proof.closedAt).toLocaleDateString()}`}
                        </CardDescription>
                    </CardHeader>
                </Card>

                {/* AI Summary */}
                {proof.aiSummary && (
                    <Card className="bg-card/50 backdrop-blur-sm border-white/10">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <span>✨</span> Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-foreground leading-relaxed">{proof.aiSummary}</p>
                            {proof.aiSummaryModel && (
                                <p className="text-xs text-muted-foreground mt-4">
                                    Generated by {proof.aiSummaryModel}
                                </p>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Event Timeline */}
                {proof.events && proof.events.length > 0 && (
                    <Card className="bg-card/50 backdrop-blur-sm border-white/10">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <IconClock className="h-5 w-5" /> Activity Timeline
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {proof.events.map((event) => (
                                    <div
                                        key={event.id}
                                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-white/5"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg">
                                                {eventIcons[event.eventType] || "📌"}
                                            </span>
                                            <span className="text-sm font-medium capitalize">
                                                {event.eventType.replace(/_/g, " ")}
                                            </span>
                                        </div>
                                        <span className="text-xs text-muted-foreground">
                                            {new Date(event.createdAt).toLocaleString()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Hash Verification */}
                {proof.hashChainRoot && (
                    <Card className="bg-green-500/5 border-green-500/20">
                        <CardContent className="py-4">
                            <div className="flex items-center gap-3">
                                <IconShieldCheck className="h-6 w-6 text-green-500" />
                                <div>
                                    <p className="font-medium text-green-400">Hash Chain Verified</p>
                                    <p className="text-xs font-mono text-muted-foreground break-all mt-1">
                                        {proof.hashChainRoot}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                <Separator className="bg-white/10" />

                {/* Footer */}
                <div className="text-center text-sm text-muted-foreground">
                    <p>This is a tamper-evident proof packet generated by ShipDocket.</p>
                    <p className="mt-1">
                        <a href="https://shipdocket.dev" className="text-primary hover:underline">
                            Learn more about ShipDocket →
                        </a>
                    </p>
                </div>
            </main>
        </div>
    );
}
