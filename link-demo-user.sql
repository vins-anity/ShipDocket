-- Link demo user to workspace
-- Run this in Supabase SQL Editor

INSERT INTO workspace_members (workspace_id, user_id, role, created_at, updated_at)
VALUES (
  '538657ca-6ccc-4cec-9436-519a0cf848b6',
  'd2ccf1f7-e093-419e-bef9-36ecf101651b',
  'owner',
  NOW(),
  NOW()
);
