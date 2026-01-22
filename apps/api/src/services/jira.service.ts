export class JiraService {
    private baseUrl: string;
    private email: string;
    private apiToken: string;

    constructor() {
        this.baseUrl = process.env.JIRA_HOST || "";
        this.email = process.env.JIRA_EMAIL || "";
        this.apiToken = process.env.JIRA_API_TOKEN || "";
    }

    /**
     * Transition a Jira issue to a new status
     */
    async syncTaskStatus(taskId: string, status: string) {
        if (!this.baseUrl || !this.email || !this.apiToken) {
            console.warn("[Jira] Credentials missing, skipping status sync");
            return;
        }

        try {
            // 1. Get available transitions
            const transitionsResponse = await fetch(
                `https://${this.baseUrl}/rest/api/3/issue/${taskId}/transitions`,
                {
                    method: "GET",
                    headers: this.getHeaders(),
                },
            );

            if (!transitionsResponse.ok) {
                throw new Error(`Failed to get transitions: ${transitionsResponse.statusText}`);
            }

            const transitionsData = await transitionsResponse.json();
            const transition = transitionsData.transitions.find(
                (t: any) => t.name.toLowerCase() === status.toLowerCase(),
            );

            if (!transition) {
                console.warn(`[Jira] Transition to "${status}" not found for ${taskId}`);
                return;
            }

            // 2. Perform transition
            const updateResponse = await fetch(
                `https://${this.baseUrl}/rest/api/3/issue/${taskId}/transitions`,
                {
                    method: "POST",
                    headers: this.getHeaders(),
                    body: JSON.stringify({
                        transition: { id: transition.id },
                    }),
                },
            );

            if (!updateResponse.ok) {
                throw new Error(`Failed to update status: ${updateResponse.statusText}`);
            }

            console.log(`[Jira] Synced status for ${taskId} to "${status}"`);
        } catch (error) {
            console.error(`[Jira] Failed to sync status for ${taskId}:`, error);
            // Don't throw, just log. Jira sync failure shouldn't crash the app.
        }
    }

    private getHeaders() {
        const auth = Buffer.from(`${this.email}:${this.apiToken}`).toString("base64");
        return {
            Authorization: `Basic ${auth}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        };
    }
}

export const jiraService = new JiraService();
