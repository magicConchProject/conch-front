// src/components/post/AddPost.tsx
export async function addPost(data: any) {
    return fetch("/api/post/addPost", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((res) => res.json());
}

export async function plusView(postId: number) {
    return fetch(`/api/post/plusView/${postId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
}

export async function editPost(postId: number, title: string, contents: string, tag_id: number | null) {
    return fetch(`/api/post/${postId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, contents, tag_id }),
    }).then((res) => res.json());
}

export async function deletePost(postId: number) {
    return fetch(`/api/post/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
}
