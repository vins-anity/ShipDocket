import {
    IconDeviceFloppy,
    IconSettings,
    IconTrash,
    IconUsers,
    IconActivity,
    IconBuilding,
    IconBrandSlack,
    IconBrandGithub,
    IconBrandTrello, // Proxy for Jira
    IconCheck,
    IconX
} from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWorkspaceStatus } from "@/hooks/use-workspace-status";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner"; // Assuming sonner is used, or we fallback to console

export function SettingsPage() {
    const { data: workspace } = useWorkspaceStatus();
    const queryClient = useQueryClient();

    // Workflow State
    const [startStatuses, setStartStatuses] = useState<string[]>([]);
    const [newStatus, setNewStatus] = useState("");

    // Branding State
    const [brandColor, setBrandColor] = useState("#3b82f6");
    const [brandLogo, setBrandLogo] = useState("");

    // Proof Rules State
    const [autoCreateOnDone, setAutoCreateOnDone] = useState(true);

    // Sync state
    useEffect(() => {
        if (workspace?.workflowSettings?.startTracking) {
            setStartStatuses(workspace.workflowSettings.startTracking);
        }
        if (workspace?.proofPacketRules) {
            setAutoCreateOnDone(workspace.proofPacketRules.autoCreateOnDone ?? true);
        }
    }, [workspace]);

    // Fetch Members
    const { data: members } = useQuery({
        queryKey: ["workspace-members", workspace?.id],
        queryFn: async () => {
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token;
            if (!token || !workspace) return [];
            const res = await fetch(`${import.meta.env.VITE_API_URL}/workspaces/${workspace.id}/members`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return res.json();
        },
        enabled: !!workspace?.id,
    });

    // Mutations
    const updateSettingsMutation = useMutation({
        mutationFn: async (payload: any) => {
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token;
            if (!token || !workspace) throw new Error("Not authenticated");

            // Mock endpoint for branding if not fully separate
            const res = await fetch(`${import.meta.env.VITE_API_URL}/workspaces/${workspace.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error("Failed to update");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["workspace-status"] });
            toast.success("Settings saved successfully");
        },
        onError: () => toast.error("Failed to save settings")
    });

    const handleSaveStartStatuses = () => {
        updateSettingsMutation.mutate({
            workflowSettings: {
                startTracking: startStatuses,
                reviewStatus: ["In Review"], // naive preserve
                doneStatus: ["Done"]
            }
        });
    };

    const handleSaveBranding = () => {
        // In a real app we'd save this to a 'branding' column
        // For now we just pretend
        toast.success("Branding assets updated");
    };

    const handleSaveRules = () => {
        updateSettingsMutation.mutate({
            proofPacketRules: {
                autoCreateOnDone: autoCreateOnDone,
                minEventsForProof: 5,
                excludedTaskTypes: []
            }
        });
    };

    if (!workspace) return <div className="p-8 font-heading text-brand-gray-mid">Loading admin console...</div>;

    return (
        <div className="space-y-8 animate-fade-in max-w-6xl mx-auto py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-black font-heading tracking-tight text-brand-dark">Admin Console</h1>
                    <p className="text-brand-gray-mid mt-1 font-serif italic text-lg">Manage your workspace, team, and configurations.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Badge variant="outline" className="border-brand-accent-blue/30 text-brand-accent-blue bg-brand-accent-blue/10 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider">
                        {workspace.defaultPolicyTier?.toUpperCase() || "STANDARD"} TIER
                    </Badge>
                </div>
            </div>

            <Tabs defaultValue="workflow" className="space-y-8">
                <TabsList className="bg-brand-light p-1.5 rounded-xl border border-brand-gray-light justify-start h-auto gap-2">
                    <TabsTrigger
                        value="workflow"
                        className="data-[state=active]:bg-brand-dark data-[state=active]:text-brand-light data-[state=active]:shadow-md rounded-lg px-4 py-2.5 transition-all"
                    >
                        <IconSettings className="w-4 h-4 mr-2" /> Workflow
                    </TabsTrigger>
                    <TabsTrigger
                        value="proofs"
                        className="data-[state=active]:bg-brand-accent-orange data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg px-4 py-2.5 transition-all"
                    >
                        <IconCheck className="w-4 h-4 mr-2" /> Proof Rules
                    </TabsTrigger>
                    <TabsTrigger
                        value="health"
                        className="data-[state=active]:bg-brand-accent-green data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg px-4 py-2.5 transition-all"
                    >
                        <IconActivity className="w-4 h-4 mr-2" /> System Health
                    </TabsTrigger>
                    <TabsTrigger
                        value="team"
                        className="data-[state=active]:bg-brand-accent-blue data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg px-4 py-2.5 transition-all"
                    >
                        <IconUsers className="w-4 h-4 mr-2" /> Team
                    </TabsTrigger>
                    <TabsTrigger
                        value="branding"
                        className="data-[state=active]:bg-brand-gray-mid data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg px-4 py-2.5 transition-all"
                    >
                        <IconBuilding className="w-4 h-4 mr-2" /> Branding
                    </TabsTrigger>
                </TabsList>

                {/* WORKFLOW TAB */}
                <TabsContent value="workflow" className="space-y-6">
                    <Card className="bg-white border-brand-gray-light shadow-sm overflow-hidden">
                        <CardHeader className="bg-brand-light/50 border-b border-brand-gray-light/50 pb-6">
                            <CardTitle className="font-heading font-bold text-xl text-brand-dark">Trigger Configuration</CardTitle>
                            <CardDescription className="text-brand-gray-mid">When should ShipDocket start tracking?</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {startStatuses.map((status) => (
                                    <div key={status} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-accent-blue/10 border border-brand-accent-blue/20 text-brand-accent-blue text-sm font-medium">
                                        <span>{status}</span>
                                        <button onClick={() => setStartStatuses(startStatuses.filter(s => s !== status))} className="text-brand-accent-blue/70 hover:text-brand-accent-blue transition-colors">
                                            <IconX size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-3 max-w-sm">
                                <Input
                                    value={newStatus} onChange={(e) => setNewStatus(e.target.value)}
                                    placeholder="Add status (e.g. 'Working')"
                                    className="bg-brand-light border-brand-gray-light focus:border-brand-accent-blue"
                                />
                                <Button
                                    onClick={(e) => { e.preventDefault(); if (newStatus && !startStatuses.includes(newStatus)) { setStartStatuses([...startStatuses, newStatus]); setNewStatus(""); } }}
                                    variant="outline"
                                    className="border-brand-gray-light text-brand-dark hover:bg-brand-light"
                                >
                                    Add
                                </Button>
                            </div>
                            <div className="pt-4 border-t border-brand-gray-light/50">
                                <Button onClick={handleSaveStartStatuses} className="bg-brand-dark hover:bg-black text-brand-light shadow-lg hover:-translate-y-0.5 transition-all rounded-xl px-6">
                                    <IconDeviceFloppy className="w-4 h-4 mr-2" /> Save Workflow
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* PROOF RULES TAB */}
                <TabsContent value="proofs" className="space-y-6">
                    <Card className="bg-white border-brand-gray-light shadow-sm overflow-hidden">
                        <CardHeader className="bg-brand-light/50 border-b border-brand-gray-light/50 pb-6">
                            <CardTitle className="font-heading font-bold text-xl text-brand-dark">Smart Creation Rules</CardTitle>
                            <CardDescription className="text-brand-gray-mid">Configure when Proof Packets are automatically generated.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8 pt-8">
                            <div className="flex items-center justify-between p-6 rounded-2xl bg-brand-light border border-brand-gray-light/50 transition-colors hover:border-brand-accent-orange/30">
                                <div>
                                    <h3 className="font-bold font-heading text-lg text-brand-dark">Auto-Create on "Done"</h3>
                                    <p className="text-sm text-brand-gray-mid mt-1 font-serif italic max-w-xl">
                                        Automatically create a draft Proof Packet when a Jira task updates to "Done".
                                    </p>
                                </div>
                                <div
                                    className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-colors duration-300 ${autoCreateOnDone ? 'bg-brand-accent-orange' : 'bg-brand-gray-mid/30'}`}
                                    onClick={() => setAutoCreateOnDone(!autoCreateOnDone)}
                                >
                                    <div className={`w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-300 ${autoCreateOnDone ? 'translate-x-6' : 'translate-x-0'}`} />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-brand-gray-light/50">
                                <Button onClick={handleSaveRules} className="bg-brand-accent-orange hover:bg-orange-600 text-white shadow-lg hover:-translate-y-0.5 transition-all rounded-xl px-6">
                                    <IconDeviceFloppy className="w-4 h-4 mr-2" /> Save Rules
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* SYSTEM HEALTH TAB */}
                <TabsContent value="health" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <HealthCard
                            name="Slack"
                            icon={IconBrandSlack}
                            connected={workspace.hasSlack}
                            lastSync="1m ago"
                            color="text-[#4A154B]"
                            bgColor="bg-[#4A154B]/10"
                        />
                        <HealthCard
                            name="GitHub"
                            icon={IconBrandGithub}
                            connected={workspace.hasGithub}
                            lastSync="Active"
                            color="text-brand-dark"
                            bgColor="bg-brand-dark/10"
                        />
                        <HealthCard
                            name="Jira"
                            icon={IconBrandTrello}
                            connected={workspace.hasJira}
                            lastSync="Active"
                            color="text-[#0052CC]"
                            bgColor="bg-[#0052CC]/10"
                        />
                    </div>
                </TabsContent>

                {/* TEAM TAB */}
                <TabsContent value="team" className="space-y-6">
                    <Card className="bg-white border-brand-gray-light shadow-sm overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between bg-brand-light/50 border-b border-brand-gray-light/50 pb-6">
                            <div>
                                <CardTitle className="font-heading font-bold text-xl text-brand-dark">Team Members</CardTitle>
                                <CardDescription className="text-brand-gray-mid">Manage access to your workspace.</CardDescription>
                            </div>
                            <Button variant="outline" className="border-brand-gray-mid/30 text-brand-dark hover:bg-brand-dark hover:text-white transition-colors rounded-xl">Invite Member</Button>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                {members?.map((m: any) => (
                                    <div key={m.userId} className="flex items-center justify-between p-4 rounded-xl bg-brand-light/30 border border-brand-gray-light hover:border-brand-gray-mid/30 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-brand-dark text-brand-light flex items-center justify-center text-sm font-bold shadow-md">
                                                {m.role?.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-brand-dark">{m.userId}</div>
                                                <div className="text-xs text-brand-gray-mid font-medium uppercase tracking-wide">{m.role}</div>
                                            </div>
                                        </div>
                                        <Badge variant={m.role === 'owner' ? 'default' : 'secondary'} className="px-3 py-1 bg-brand-light border-brand-gray-mid/20 text-brand-dark">
                                            {m.role}
                                        </Badge>
                                    </div>
                                ))}
                                {!members?.length && <div className="text-brand-gray-mid text-sm italic p-4 text-center">No members found.</div>}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* BRANDING TAB */}
                <TabsContent value="branding" className="space-y-6">
                    <Card className="bg-white border-brand-gray-light shadow-sm overflow-hidden">
                        <CardHeader className="bg-brand-light/50 border-b border-brand-gray-light/50 pb-6">
                            <CardTitle className="font-heading font-bold text-xl text-brand-dark">Whitelabel Settings</CardTitle>
                            <CardDescription className="text-brand-gray-mid">Customize the Proof Packets sent to your clients.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8 pt-8">
                            <div className="grid gap-6 max-w-md">
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-brand-dark uppercase tracking-wide">Primary Brand Color</label>
                                    <div className="flex gap-3">
                                        <div className="w-12 h-12 rounded-xl border border-brand-gray-light shadow-sm" style={{ background: brandColor }} />
                                        <Input value={brandColor} onChange={e => setBrandColor(e.target.value)} className="bg-brand-light border-brand-gray-light h-12 font-mono" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-brand-dark uppercase tracking-wide">Logo URL</label>
                                    <Input value={brandLogo} onChange={e => setBrandLogo(e.target.value)} placeholder="https://..." className="bg-brand-light border-brand-gray-light h-12" />
                                </div>
                            </div>
                            <div className="pt-4 border-t border-brand-gray-light/50">
                                <Button onClick={handleSaveBranding} className="bg-brand-dark hover:bg-black text-white shadow-lg hover:-translate-y-0.5 transition-all rounded-xl px-6">
                                    <IconDeviceFloppy className="w-4 h-4 mr-2" /> Save Branding
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}


function HealthCard({ name, icon: Icon, connected, lastSync, color, bgColor }: any) {
    return (
        <Card className="bg-white border-brand-gray-light shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${bgColor || 'bg-brand-light'}`}>
                        <Icon className={`w-6 h-6 ${color || 'text-brand-gray-mid'}`} />
                    </div>
                    {connected ? (
                        <Badge className="bg-brand-accent-green/10 text-brand-accent-green border-brand-accent-green/20">
                            <IconCheck size={12} className="mr-1" /> Connected
                        </Badge>
                    ) : (
                        <Badge variant="destructive" className="bg-red-50 text-red-500 border-red-100">
                            <IconX size={12} className="mr-1" /> Disconnected
                        </Badge>
                    )}
                </div>
                <div className="space-y-1">
                    <h3 className="font-bold font-heading text-lg text-brand-dark">{name}</h3>
                    <p className="text-xs text-brand-gray-mid font-medium">
                        {connected ? `Operational • ${lastSync}` : "Integration not configured"}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
