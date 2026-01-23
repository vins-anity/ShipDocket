import { useQuery } from "@tanstack/react-query";

export function useDashboardStats(workspaceId?: string) {
    const { data, isLoading } = useQuery({
        queryKey: ["dashboard-stats", workspaceId],
        queryFn: async () => {
            if (!workspaceId) return null;
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/events/stats?workspaceId=${workspaceId}`,
            );
            if (!res.ok) throw new Error("Failed to fetch stats");
            return res.json();
        },
        enabled: !!workspaceId,
    });

    return {
        stats: {
            activeTasks: data?.activeTasks || 0,
            pendingProofs: data?.pendingProofs || 0,
            completedProofs: data?.completedProofs || 0,
            vetoed: data?.vetoed || 0,
        },
        isLoading,
    };
}
