//sign/signin/page
export async function signIn(data: any) {
    return fetch(`/api/user/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            if (res.statusCode == 500) {
                throw new Error("서버 에러");
            } else if (res.statusCode == 400) {
                throw new Error("잘못된 호출");
            } else if (res.statusCode == 401) {
                throw new Error(res.message);
            }
            return res;
        });
}

// sign/signup/page
export async function signUp(data: any) {
    return fetch("/api/user/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            if (res.statusCode == 500) {
                throw new Error("서버 에러");
            } else if (res.statusCode == 400) {
                throw new Error("잘못된 호출");
            } else if (res.statusCode == 401) {
                throw new Error(res.message);
            }
            return res;
        });
}

//src/components/Navbar
export async function signOutApi() {
    return fetch("/api/user/signout").then((res) => res.json());
}

export async function editUserName(name: string) {
    return fetch("/api/user/editUserName", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
    }).then((res) => res.json());
}

export async function editPassword(password: string) {
    return fetch("/api/user/editPassword", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
    }).then((res) => res.json());
}
