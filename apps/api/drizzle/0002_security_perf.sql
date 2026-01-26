-- Custom migration: Optimize RLS, Fix Function Security, and Ensure Indexes

-- 1. Ensure Indexes exist (for workspace_members lookups)
CREATE INDEX IF NOT EXISTS idx_workspace_members_user_id ON public.workspace_members(user_id);
CREATE INDEX IF NOT EXISTS idx_workspace_members_workspace_user ON public.workspace_members(workspace_id, user_id);

-- 2. Optimize RLS Policy for Performance (Reduce InitPlan overhead)
-- Drop the old policy first
DROP POLICY IF EXISTS "Users can view members of their workspaces" ON public.workspace_members;

-- Create the optimized policy using (select auth.uid()) wrapper
CREATE POLICY "Users can view members of their workspaces" ON public.workspace_members
  FOR SELECT TO authenticated
  USING (
    (select auth.uid()) = user_id 
    OR 
    workspace_id IN (
        SELECT workspace_id 
        FROM workspace_members 
        WHERE user_id = (select auth.uid())
    )
  );

-- 3. Secure Function Search Paths (Security Linter Fix)
-- Prevents search_path hijacking
ALTER FUNCTION pgboss.create_queue(text, jsonb) SET search_path = pgboss, public;
ALTER FUNCTION pgboss.delete_queue(text) SET search_path = pgboss, public;

-- 4. Move http extension (Best Attempt)
-- Note: 'http' extension often errors on SET SCHEMA, so we wrap in a block or ignore if it fails.
-- This command is here for documentation, but if it fails in production due to extension limits, it's non-critical.
DO $$ 
BEGIN
    ALTER EXTENSION http SET SCHEMA extensions;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Could not move http extension: %', SQLERRM;
END $$;
