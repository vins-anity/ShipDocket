-- Migration: Add OAuth refresh tokens and expiry
ALTER TABLE workspaces ADD COLUMN jira_refresh_token TEXT;
ALTER TABLE workspaces ADD COLUMN jira_token_expires_at TIMESTAMP;
ALTER TABLE workspaces ADD COLUMN slack_refresh_token TEXT;
ALTER TABLE workspaces ADD COLUMN slack_token_expires_at TIMESTAMP;
