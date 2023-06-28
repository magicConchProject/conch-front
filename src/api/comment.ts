export async function addComment(data: any) {
    return fetch("/api/comment/addComment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((res) => res.json());
}

export async function editComment(comment_id: number, comment: string) {
    return fetch(`/api/comment/${comment_id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({comment})
    }).then((res) => res.json())
}

export async function deleteComment(comment_id: number) {
    return fetch(`/api/comment/${comment_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json())
}