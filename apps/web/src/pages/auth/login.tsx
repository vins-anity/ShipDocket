import { valibotResolver } from "@hookform/resolvers/valibot";
import { IconAlertCircle, IconLoader2, IconShieldCheck } from "@tabler/icons-react";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
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
            <div className="flex items-center justify-center min-h-screen bg-brand-light">
                <IconLoader2 className="h-8 w-8 animate-spin text-brand-dark" />
            </div>
        );
    }

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-brand-light p-4 overflow-hidden font-sans">
            {/* Background Glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand-accent-blue/5 blur-[120px] rounded-full animate-slower-pulse" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-brand-accent-orange/5 blur-[120px] rounded-full animate-slower-pulse animation-delay-2000" />

            {/* Back Arrow */}
            <div className="absolute top-6 left-6 z-10">
                <Link
                    to="/"
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-brand-gray-light text-brand-dark hover:bg-brand-dark hover:text-brand-light transition-all duration-300 group"
                    aria-label="Back to Home"
                >
                    <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* Login card */}
            <Card className="relative w-full max-w-md border-brand-gray-light bg-white/80 backdrop-blur-xl shadow-2xl animate-fade-in-up rounded-3xl overflow-hidden">
                <CardHeader className="space-y-6 text-center pb-2 pt-10">
                    {/* Logo */}
                    <div className="flex justify-center">
                        <div className="h-20 w-20 rounded-2xl bg-brand-dark flex items-center justify-center shadow-lg shadow-brand-dark/20 transform hover:scale-105 transition-transform duration-500">
                            <IconShieldCheck className="h-10 w-10 text-brand-light" />
                        </div>
                    </div>
                    <div>
                        <CardTitle className="text-4xl font-black font-heading tracking-tight text-brand-dark">
                            ShipDocket
                        </CardTitle>
                        <CardDescription className="mt-2 text-brand-gray-mid font-serif italic text-lg">
                            Delivery assurance for software teams
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="pt-8 px-8 pb-10">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {authError && (
                            <Alert
                                variant="destructive"
                                className="animate-slide-up bg-red-50 border-red-100 text-red-600"
                            >
                                <IconAlertCircle className="h-4 w-4" />
                                <AlertDescription>{authError}</AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-2">
                            <Input
                                type="email"
                                placeholder="name@example.com"
                                className="h-12 bg-white border-brand-gray-mid/30 focus:border-brand-dark focus:ring-brand-dark/5 transition-all rounded-xl text-base"
                                {...register("email")}
                                aria-invalid={!!errors.email}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500 font-medium animate-slide-up">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Input
                                type="password"
                                placeholder="Password"
                                className="h-12 bg-white border-brand-gray-mid/30 focus:border-brand-dark focus:ring-brand-dark/5 transition-all rounded-xl text-base"
                                {...register("password")}
                                aria-invalid={!!errors.password}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500 font-medium animate-slide-up">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-12 text-base font-bold font-heading rounded-xl bg-brand-dark text-brand-light hover:bg-black hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-xl shadow-brand-dark/10 cursor-pointer"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <IconLoader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>

                        {/* OAuth Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-brand-gray-light" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
                                <span className="bg-white px-4 text-brand-gray-mid">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        {/* OAuth Providers */}
                        <div className="grid grid-cols-2 gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="h-12 border-brand-gray-light bg-white hover:bg-gray-50 hover:border-brand-gray-mid text-brand-dark font-medium rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                                onClick={signInWithGoogle}
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                >
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
                                variant="default"
                                className="h-12 bg-[#24292F] hover:bg-[#24292F]/90 text-white border-transparent font-medium rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                                onClick={signInWithGitHub}
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                GitHub
                            </Button>
                        </div>
                    </form>
                    <div className="mt-8 text-center text-sm text-brand-gray-mid">
                        <p>
                            Want to explore first?{" "}
                            <a
                                href="/demo"
                                className="font-bold text-brand-dark hover:text-brand-accent-blue hover:underline transition-colors"
                            >
                                Try the demo
                            </a>
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Footer */}
            <div className="absolute bottom-8 left-0 right-0 text-center text-brand-gray-mid/50 text-xs font-serif italic">
                &copy; {new Date().getFullYear()} ShipDocket. All rights reserved.
            </div>
        </div>
    );
}
