import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { JiraService } from '../services/jira.service';

// Use spyOn to allow implementation changes and avoid global type mismatches
const mockFetch = vi.fn();
global.fetch = mockFetch as unknown as typeof fetch;

describe('Jira Service', () => {
    let service: JiraService;
    const originalEnv = process.env;

    beforeEach(() => {
        vi.clearAllMocks();
        process.env = {
            ...originalEnv,
            JIRA_HOST: 'test.atlassian.net',
            JIRA_EMAIL: 'user@test.com',
            JIRA_API_TOKEN: 'token',
        };
        service = new JiraService();
    });

    afterEach(() => {
        process.env = originalEnv;
    });

    describe('syncTaskStatus', () => {
        it('should sync status if transition exists', async () => {
            // Mock transitions response
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    transitions: [{ id: '101', name: 'Done' }],
                }),
            });

            // Mock update response
            mockFetch.mockResolvedValueOnce({
                ok: true,
            });

            await service.syncTaskStatus('TRAIL-123', 'Done');

            // Verify fetching transitions
            expect(mockFetch).toHaveBeenNthCalledWith(1,
                expect.stringContaining('/issue/TRAIL-123/transitions'),
                expect.objectContaining({ method: 'GET' })
            );

            // Verify posting transition
            expect(mockFetch).toHaveBeenNthCalledWith(2,
                expect.stringContaining('/issue/TRAIL-123/transitions'),
                expect.objectContaining({
                    method: 'POST',
                    body: JSON.stringify({ transition: { id: '101' } }),
                })
            );
        });

        it('should log warning if transition not found', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    transitions: [{ id: '101', name: 'In Progress' }],
                }),
            });

            const consoleSpy = vi.spyOn(console, 'warn');
            await service.syncTaskStatus('TRAIL-123', 'Done');

            expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Transition to "Done" not found'));
            expect(mockFetch).toBeCalledTimes(1); // Should not try to update
        });

        it('should gracefully handle API errors', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: false,
                statusText: 'Unauthorized',
            });

            const consoleSpy = vi.spyOn(console, 'error');
            await service.syncTaskStatus('TRAIL-123', 'Done');

            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining('Failed to sync status'),
                expect.anything()
            );
        });
    });
});
