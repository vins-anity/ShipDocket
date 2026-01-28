-- Create Demo User and Workspace for ShipDocket Demo
-- Run this in Supabase SQL Editor

-- 1. Create demo workspace
INSERT INTO workspaces (id, name, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'ShipDocket Demo Workspace',
  NOW(),
  NOW()
)
RETURNING id;

-- IMPORTANT: Copy the workspace_id from the result above, then replace <WORKSPACE_ID> below

-- 2. Note: Demo user must be created via Supabase Auth Dashboard or admin API
-- Email: demo@shipdocket.com
-- Password: demo123456
-- After creating, copy the user_id and replace <USER_ID> below

-- 3. Link demo user to workspace (run after creating user)
-- INSERT INTO workspace_members (workspace_id, user_id, role, created_at, updated_at)
-- VALUES (
--   '<WORKSPACE_ID>',  -- Replace with workspace ID from step 1
--   '<USER_ID>',       -- Replace with user ID from Supabase Auth
--   'owner',
--   NOW(),
--   NOW()
-- );
