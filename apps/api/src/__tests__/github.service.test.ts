import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GitHubService } from '../services/github.service';

const mocks = vi.hoisted(() => ({
    get: vi.fn(),
    listCommits: vi.fn(),
}));

vi.mock('@octokit/rest', () => {
    return {
        Octokit: class {
            pulls = {
                get: mocks.get,
                listCommits: mocks.listCommits,
            };
        },
    };
});

describe('GitHub Service', () => {
    let service: GitHubService;

    beforeEach(() => {
        vi.clearAllMocks();
        service = new GitHubService('fake-token');
    });

    describe('fetchPRDetails', () => {
        it('should return mapped PR details', async () => {
            mocks.get.mockResolvedValueOnce({
                data: {
                    title: 'Feat: Add Login',
                    body: 'Implements login flow',
                    state: 'closed',
                    merged: true,
                    user: { login: 'octocat' },
                    labels: [{ name: 'enhancement' }],
                    created_at: '2023-01-01T00:00:00Z',
                    merged_at: '2023-01-02T00:00:00Z',
                },
            });

            const result = await service.fetchPRDetails('owner', 'repo', 123);

            expect(mocks.get).toHaveBeenCalledWith({
                owner: 'owner',
                repo: 'repo',
                pull_number: 123,
            });
            expect(result).toEqual({
                title: 'Feat: Add Login',
                body: 'Implements login flow',
                state: 'closed',
                merged: true,
                author: 'octocat',
                labels: ['enhancement'],
                createdAt: '2023-01-01T00:00:00Z',
                mergedAt: '2023-01-02T00:00:00Z',
            });
        });

        it('should throw error on failure', async () => {
            mocks.get.mockRejectedValueOnce(new Error('API Error'));

            await expect(service.fetchPRDetails('owner', 'repo', 123))
                .rejects.toThrow('Failed to fetch PR details: API Error');
        });
    });

    describe('fetchCommits', () => {
        it('should return mapped commits', async () => {
            mocks.listCommits.mockResolvedValueOnce({
                data: [
                    {
                        sha: 'abc1234',
                        commit: {
                            message: 'Initial commit',
                            author: { name: 'Dev', date: '2023-01-01' },
                        },
                        author: { login: 'dev-user' },
                    },
                ],
            });

            const result = await service.fetchCommits('owner', 'repo', 123);

            expect(mocks.listCommits).toHaveBeenCalledWith({
                owner: 'owner',
                repo: 'repo',
                pull_number: 123,
                per_page: 50,
            });
            expect(result).toHaveLength(1);
            expect(result[0]!.message).toBe('Initial commit');
            expect(result[0]!.author).toBe('Dev');
        });
    });
});
