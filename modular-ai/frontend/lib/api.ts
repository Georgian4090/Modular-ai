export async function* streamChat(message: string, sessionId: string): AsyncGenerator<string, void, undefined> {
  const response = await fetch("http://localhost:8000/chat/stream", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, session_id: sessionId }),
  });

  if (!response.ok) {
    throw new Error(`Chat stream failed with status ${response.status}`);
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("Response body is not readable");
  }

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const events = buffer.split("\n\n");
    buffer = events.pop() ?? "";

    for (const event of events) {
      const trimmed = event.trim();
      if (!trimmed.startsWith("data:")) {
        continue;
      }

      const token = trimmed.replace(/^data:\s*/, "").trim();
      if (!token || token === "[DONE]") {
        continue;
      }

      yield token;
    }
  }

  const leftover = buffer.trim();
  if (leftover.startsWith("data:")) {
    const token = leftover.replace(/^data:\s*/, "").trim();
    if (token && token !== "[DONE]") {
      yield token;
    }
  }
}
