import { useQuery } from "@tanstack/react-query";
import type { EventType } from "shared";
import { api } from "@/lib/api";

interface UseEventsOptions {
    workspaceId?: string;
    taskId?: string;
    eventType?: EventType;
    page?: number;
    pageSize?: number;
}

export function useEvents(options: UseEventsOptions = {}) {
    return useQuery({
        queryKey: ["events", options],
        queryFn: async () => {
            return api.events.list(options);
        },
    });
}
