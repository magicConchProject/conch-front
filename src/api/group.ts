//src/components/post/AddGroup.tsx
export async function addGroup(data: any) {
    return fetch("/api/group", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((res) => res.json());
}

//src/compoments/post/Participate.tsx
export async function searchGroup(data: any) {
    return fetch("/api/group/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((res) => res.json());
}
//src/compoments/post/Participate.tsx
export async function participate(selectedGroup: Object | null) {
    return fetch("/api/group/participate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedGroup),
    }).then((res) => res.json());
}

export async function denyParticipation(userGroupId: number, groupId: number) {
    return fetch(`/api/group/denyParticipation/${userGroupId}/${groupId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
}

export async function acceptParticipation(userGroupId: number) {
    return fetch(`/api/group/acceptParticipation/${userGroupId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
}

export async function editGroupName(groupId: number, name: string) {
    return fetch(`/api/group/${groupId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(name),
    }).then((res) => res.json());
}

export async function deleteGroup(groupId: number) {
    return fetch(`/api/group/${groupId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
}

export async function canellationGroup(userGroupId: number, groupId: number) {
    return fetch(`/api/group/canellationGroup/${userGroupId}/${groupId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
}
