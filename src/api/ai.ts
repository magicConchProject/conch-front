// src/components/bard/bard.tsx
export async function bardAsk(answer: string) {
    return fetch("/api", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ask: answer,
        }),
    }).then((res) => res.json());
}

export async function OpenAiAsk(model: string, messages: any, concept: string) {
    return fetch("/api/gptChat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model,
            messages,
            concept
        }),
    })
}

export async function OpenAiCreateImage(prompt: string, n: number, size: string) {
    return fetch("/api/createGptImage", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt,
            n,
            size,
        }),
    }).then((res) => res.json());
}
