import { IconBuilding, IconMail, IconShield, IconUser, IconUsers } from "@tabler/icons-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useWorkspaceStatus } from "@/hooks/use-workspace-status";

export function SettingsPage() {
    const { user } = useAuth();
    const { data: workspace, isLoading } = useWorkspaceStatus();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your account and workspace preferences.
                </p>
            </div>

            <Separator className="bg-white/10" />

            <div className="grid gap-6">
                {/* Profile Section */}
                <Card className="bg-card/50 backdrop-blur-sm border-white/5">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <IconUser className="h-5 w-5 text-primary" />
                            <CardTitle>Profile</CardTitle>
                        </div>
                        <CardDescription>Your personal account information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="full-name" className="text-sm font-medium">
                                    Full Name
                                </label>
                                <Input
                                    id="full-name"
                                    disabled
                                    value={user?.user_metadata?.full_name || "Trail User"}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">
                                    Email Address
                                </label>
                                <div className="flex gap-2">
                                    <IconMail className="h-4 w-4 absolute translate-y-3 translate-x-3 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        disabled
                                        value={user?.email}
                                        className="pl-9"
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Workspace Section */}
                <Card className="bg-card/50 backdrop-blur-sm border-white/5">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <IconBuilding className="h-5 w-5 text-primary" />
                            <CardTitle>Workspace</CardTitle>
                        </div>
                        <CardDescription>Manage your Trail Enterprise workspace.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {isLoading ? (
                            <div className="animate-pulse h-20 bg-white/5 rounded-lg" />
                        ) : workspace ? (
                            <div className="flex items-center justify-between p-4 border border-white/5 rounded-lg bg-background/50">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                        <IconShield className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{workspace.name}</h4>
                                        <p className="text-sm text-muted-foreground font-mono text-xs">
                                            ID: {workspace.id}
                                        </p>
                                    </div>
                                </div>
                                <Badge
                                    variant="secondary"
                                    className="bg-green-500/10 text-green-500 hover:bg-green-500/20"
                                >
                                    {workspace.defaultPolicyTier || "Standard"} Plan
                                </Badge>
                            </div>
                        ) : (
                            <div className="p-4 text-center text-muted-foreground">
                                No workspace found.
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <IconUsers className="h-4 w-4" />
                                    <h4 className="font-medium text-sm">Team Members</h4>
                                </div>
                                <Button variant="outline" size="sm" className="h-8">
                                    Invite Member
                                </Button>
                            </div>

                            <div className="space-y-2">
                                {[
                                    { name: "Demo User", email: "demo@trail.ai", role: "Owner" },
                                    {
                                        name: "Sarah Engineer",
                                        email: "sarah@trail.ai",
                                        role: "Admin",
                                    },
                                    {
                                        name: "Mike Developer",
                                        email: "mike@trail.ai",
                                        role: "Member",
                                    },
                                ].map((member) => (
                                    <div
                                        key={member.email}
                                        className="flex items-center justify-between p-3 rounded-md hover:bg-white/5 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                                                {member.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{member.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {member.email}
                                                </p>
                                            </div>
                                        </div>
                                        <Badge
                                            variant="outline"
                                            className="border-white/10 text-muted-foreground"
                                        >
                                            {member.role}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
