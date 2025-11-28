export async function chatService(history: { role: string; parts: string }[], message: string) {
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ history, message }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch chat response');
    }

    return response.json();
}
