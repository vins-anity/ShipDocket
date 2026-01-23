import { IconChevronRight, IconFileText, IconInbox } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ProofCardSkeleton } from "@/components/ui/skeleton";
import { useProofPackets } from "@/hooks/use-proofs";

export function ProofPacketsPage() {
    const { data, isLoading, error } = useProofPackets();

    const proofs = data?.packets || [];

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            Proof Packets
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Tamper-evident delivery receipts.
                        </p>
                    </div>
                </div>
                <div className="grid gap-4">
                    <ProofCardSkeleton />
                    <ProofCardSkeleton />
                    <ProofCardSkeleton />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 rounded-md bg-destructive/10 text-destructive">
                Failed to load proofs. Please try again later.
            </div>
        );
    }

    const statusColors: Record<string, string> = {
        draft: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        pending: "bg-orange-500/10 text-orange-500 border-orange-500/20",
        finalized: "bg-green-500/10 text-green-500 border-green-500/20",
        exported: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Proof Packets
                    </h1>
                    <p className="text-muted-foreground mt-1">Tamper-evident delivery receipts.</p>
                </div>
                <Button className="hover:glow-sm transition-all">Export Report</Button>
            </div>

            {proofs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="h-20 w-20 rounded-full bg-muted/50 flex items-center justify-center mb-6">
                        <IconInbox className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                        No proof packets yet
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md mb-6">
                        Proof packets will appear here when tasks are tracked through your connected
                        tools. Make sure your integrations are set up correctly.
                    </p>
                    <Button variant="outline" className="hover:glow-sm transition-all">
                        View Integration Status
                    </Button>
                </div>
            ) : (
                <div className="grid gap-4">
                    {proofs.map((proof) => (
                        <Link key={proof.id} to={`/proofs/${proof.id}`}>
                            <Card className="bg-card/50 backdrop-blur-sm border-white/5 hover-lift cursor-pointer group transition-all">
                                <CardHeader className="flex flex-row items-center justify-between py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                                            <IconFileText className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-base font-medium">
                                                {proof.task?.key || proof.id}
                                            </CardTitle>
                                            <p className="text-sm text-muted-foreground">
                                                {proof.task?.summary || "Proof Packet"} •{" "}
                                                {new Date(proof.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Badge
                                            className={
                                                statusColors[proof.status] ||
                                                "bg-muted text-muted-foreground border border-white/10"
                                            }
                                        >
                                            {proof.status?.charAt(0).toUpperCase() +
                                                proof.status?.slice(1) || "Pending"}
                                        </Badge>
                                        <IconChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                                    </div>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
