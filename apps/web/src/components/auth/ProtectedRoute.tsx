import { IconLoader2 } from "@tabler/icons-react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export function ProtectedRoute() {
    const { session, loading } = useAuth();

    // Show loading state while checking auth
    // This prevents the flash to login page during session restoration
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-background text-foreground">
                <div className="flex flex-col items-center gap-4">
                    <IconLoader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
