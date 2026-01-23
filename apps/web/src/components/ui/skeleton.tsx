import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Whether to show the shimmer animation */
    shimmer?: boolean;
}

function Skeleton({ className, shimmer = true, ...props }: SkeletonProps) {
    return (
        <div
            className={cn(
                "rounded-md bg-muted/50",
                shimmer &&
                    "relative overflow-hidden before:absolute before:inset-0 before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
                className,
            )}
            {...props}
        />
    );
}

/** Skeleton for stat cards on dashboard */
function StatCardSkeleton() {
    return (
        <div className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4 rounded-full" />
            </div>
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-3 w-20" />
        </div>
    );
}

/** Skeleton for activity feed items */
function ActivitySkeleton() {
    return (
        <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
            </div>
        </div>
    );
}

/** Skeleton for proof packet cards */
function ProofCardSkeleton() {
    return (
        <div className="p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-white/5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-48" />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-5 w-5" />
                </div>
            </div>
        </div>
    );
}

export { Skeleton, StatCardSkeleton, ActivitySkeleton, ProofCardSkeleton };
