/**
 * Stream responses from the FastAPI backend /chat/stream endpoint.
 * Accepts a user message and a session ID, and returns a ReadableStream of tokens.
 */
export async function streamChat(message: string, sessionId: string): Promise<ReadableStream<string>> {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  
  const response = await fetch(`${backendUrl}/chat/stream`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      session_id: sessionId,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to stream: ${response.status} ${response.statusText}`);
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error('Response body is not readable.');
  }

  const decoder = new TextDecoder('utf-8');

  return new ReadableStream<string>({
    async start(controller) {
      let buffer = '';
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          // Save the last potentially incomplete line back to the buffer
          buffer = lines.pop() || '';

          for (const line of lines) {
            const cleanLine = line.trim();
            if (cleanLine.startsWith('data: ')) {
              const token = cleanLine.substring(6);
              controller.enqueue(token);
            }
          }
        }

        // Handle any trailing buffer contents
        if (buffer.trim().startsWith('data: ')) {
          const token = buffer.trim().substring(6);
          controller.enqueue(token);
        }
      } catch (error) {
        controller.error(error);
      } finally {
        controller.close();
      }
    }
  });
}
