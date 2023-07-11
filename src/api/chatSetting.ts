/**
 * 채팅 api 세팅 저장 api
 */

export async function updateSetting(data: any) {
    return fetch(`/api/my-gpt-setting`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((res) => {
        return res.json();
    });
}

export async function getChatGptSetting() {
    return fetch(`/api/my-gpt-setting`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => {
        return res.json();
    });
}
