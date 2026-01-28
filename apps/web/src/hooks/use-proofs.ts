import { useQuery } from "@tanstack/react-query";
import type { ProofStatus } from "shared";
import { api } from "@/lib/api";

interface UseProofPacketsOptions {
    workspaceId?: string;
    status?: ProofStatus;
    page?: number;
    pageSize?: number;
}

export function useProofPackets(options: UseProofPacketsOptions = {}) {
    return useQuery({
        queryKey: ["proofs", options],
        queryFn: async () => {
            return api.proofs.list(options);
        },
        enabled: !!options.workspaceId,
    });
}
