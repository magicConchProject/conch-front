export async function addToStore(data: any) {
    return fetch(`/api/chat-gpt-store`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((res) => res.json());
}

export async function getStoreDetailData(store_id: any) {
    return fetch(`/api/chat-gpt-store/${store_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => {
        return res.json();
    });
}
