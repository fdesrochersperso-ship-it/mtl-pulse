/**
 * Pipeline failure alerting.
 * Sends to webhook (Slack, email service, etc.) when pipelines fail.
 * Set PIPELINE_ALERT_WEBHOOK_URL in production.
 */

export interface PipelineFailurePayload {
  pipeline: string;
  error: string;
  timestamp: string;
  durationMs: number;
  environment?: string;
}

export async function notifyPipelineFailure(payload: PipelineFailurePayload): Promise<void> {
  const webhookUrl = process.env.PIPELINE_ALERT_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    const body =
      typeof webhookUrl === 'string' && webhookUrl.includes('slack.com')
        ? JSON.stringify({
            text: `⚠️ MTL Pulse pipeline failed`,
            attachments: [
              {
                color: 'danger',
                fields: [
                  { title: 'Pipeline', value: payload.pipeline, short: true },
                  { title: 'Error', value: payload.error.substring(0, 500), short: false },
                  { title: 'Duration', value: `${payload.durationMs}ms`, short: true },
                  { title: 'Time', value: payload.timestamp, short: true },
                ],
              },
            ],
          })
        : JSON.stringify(payload);

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
  } catch (err) {
    console.error('[alerting] Failed to send webhook:', err);
  }
}
