
import { createClient } from "@supabase/supabase-js";

/**
 * Seed Script: Create Demo User
 * 
 * Creates a default user for the demo purposes.
 * User: demo@trail.ai
 * Pass: password123
 */

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

async function seedUser() {
    console.log("🌱 Seeding Demo User...");

    const email = process.env.SEED_EMAIL || "demo@trail.ai";
    const password = process.env.SEED_PASSWORD || "password123";

    if (!process.env.SEED_EMAIL || !process.env.SEED_PASSWORD) {
        console.warn("⚠️  Using default demo credentials. Set SEED_EMAIL and SEED_PASSWORD in .env to override.");
    }

    // Check if user exists
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();

    if (listError) {
        console.error("❌ Failed to list users:", listError.message);
        process.exit(1);
    }

    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
        console.log(`ℹ️  User ${email} already exists. Updating password...`);
        const { error: updateError } = await supabase.auth.admin.updateUserById(existingUser.id, {
            password: password,
            email_confirm: true,
            user_metadata: { full_name: "Demo User" }
        });

        if (updateError) {
            console.error("❌ Failed to update user:", updateError.message);
            process.exit(1);
        }
        console.log("✅ User updated successfully!");
    } else {
        const { error: createError } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: {
                full_name: "Demo User"
            }
        });

        if (createError) {
            console.error("❌ Failed to create user:", createError.message);
            process.exit(1);
        }
        console.log("✅ User created successfully!");
    }

    console.log(`   Email: ${email}`);
    console.log(`   Pass : ${password}`);
}

seedUser();
