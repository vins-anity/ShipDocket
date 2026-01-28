import { valibotResolver } from "@hookform/resolvers/valibot";
import { IconAlertCircle, IconLoader2, IconShieldCheck } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as v from "valibot";
import { useAuth } from "@/components/auth/AuthProvider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

const LoginSchema = v.object({
    email: v.pipe(v.string(), v.email("Please enter a valid email address.")),
    password: v.pipe(v.string(), v.minLength(6, "Password must be at least 6 characters.")),
});

type LoginFormData = v.InferOutput<typeof LoginSchema>;

export function LoginPage() {
    const [authError, setAuthError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    useEffect(() => {
        const checkSession = async () => {
            if (!loading && user) {
                // Double-check if the session is actually valid on the server
                // This prevents infinite loops where local storage has a token but it's revoked
                const { error } = await supabase.auth.getUser();
                if (!error) {
                    navigate("/dashboard");
                } else {
                    // Token is invalid, clear it
                    await supabase.auth.signOut();
                }
            }
        };
        checkSession();
    }, [user, loading, navigate]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        // biome-ignore lint/suspicious/noExplicitAny: Resolver type mismatch
        resolver: valibotResolver(LoginSchema) as any,
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        setAuthError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        });

        if (error) {
            setAuthError(error.message);
        } else {
            navigate("/dashboard");
        }
    };

    const signInWithGoogle = async () => {
        setAuthError(null);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/dashboard`,
            },
        });

        if (error) {
            setAuthError(error.message);
        }
    };

    const signInWithGitHub = async () => {
        setAuthError(null);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: `${window.location.origin}/dashboard`,
            },
        });

        if (error) {
            setAuthError(error.message);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <IconLoader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-background p-4 overflow-hidden">
            {/* Animated gradient mesh background */}
            <div className="absolute inset-0 gradient-mesh opacity-60" />

            {/* Floating orbs for visual depth */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
            <div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"
                style={{ animationDelay: "-1.5s" }}
            />
            <div
                className="absolute top-1/2 right-1/3 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl animate-float"
                style={{ animationDelay: "-3s" }}
            />

            {/* Login card */}
            <Card className="relative w-full max-w-md border-white/10 bg-card/80 backdrop-blur-xl shadow-2xl animate-fade-in">
                <CardHeader className="space-y-4 text-center pb-2">
                    {/* Logo with glow */}
                    <div className="flex justify-center">
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center glow-md">
                            <IconShieldCheck className="h-9 w-9 text-white" />
                        </div>
                    </div>
                    <div>
                        <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                            ShipDocket
                        </CardTitle>
                        <CardDescription className="mt-2 text-muted-foreground">
                            Delivery assurance for software teams
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="pt-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {authError && (
                            <Alert variant="destructive" className="animate-slide-up">
                                <IconAlertCircle className="h-4 w-4" />
                                <AlertDescription>{authError}</AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-2">
                            <Input
                                type="email"
                                placeholder="name@example.com"
                                className="h-11 bg-background/50 border-white/10 focus:border-primary/50 transition-colors"
                                {...register("email")}
                                aria-invalid={!!errors.email}
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive font-medium animate-slide-up">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Input
                                type="password"
                                placeholder="Password"
                                className="h-11 bg-background/50 border-white/10 focus:border-primary/50 transition-colors"
                                {...register("password")}
                                aria-invalid={!!errors.password}
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive font-medium animate-slide-up">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-11 font-medium transition-all duration-200 hover:glow-sm"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>

                        {/* OAuth Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                            </div>
                        </div>

                        {/* OAuth Providers */}
                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                className="h-11 border-white/10 bg-background/50 hover:bg-background/80"
                                onClick={signInWithGoogle}
                            >
                                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Google
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="h-11 border-white/10 bg-background/50 hover:bg-background/80"
                                onClick={signInWithGitHub}
                            >
                                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                GitHub
                            </Button>
                        </div>
                    </form>
                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        <p>
                            Want to explore first?{" "}
                            <a href="/demo" className="font-medium text-primary hover:underline">
                                Try the demo
                            </a>
                        </p>
                    </div>
                    {/* Trust indicators */}
                    <div className="mt-6 pt-6 border-t border-white/5">
                        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                Secure
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                Verified
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                                Enterprise
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
