import * as v from "valibot";

const envSchema = v.object({
    VITE_SUPABASE_URL: v.pipe(v.string(), v.url()),
    VITE_SUPABASE_ANON_KEY: v.string(),
    VITE_API_URL: v.pipe(v.string(), v.url()),
});

export const env = v.parse(envSchema, {
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
    VITE_API_URL: import.meta.env.VITE_API_URL,
});
