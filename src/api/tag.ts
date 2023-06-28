/**
 * 태그 생성 함수
 *
 *  */
export async function addTag(data: any) {
    return fetch(`/api/tag`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((res) => {
        return res.json();
    });
}

export async function editTag(id: number, name: string) {
    return fetch(`/api/tag/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
    }).then((res) => {
        return res.json();
    });
}

export async function deleteTag(tag_id: number) {
    return fetch(`/api/tag/${tag_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => {
        return res.json();
    });
}
