"use client";

import { acceptParticipation, denyParticipation } from "@/api/group";
import useMyParticipation from "@/data/use-my-participation";
import { toast } from "react-hot-toast";

export default function MngParticipation() {
    const { data } = useMyParticipation();

    return (
        <div>
            {data && data.length > 0 ? (
                data.map((data: any, index: number) => {
                    return (
                        <div key={data.id}>
                            <MngParticipationCard data={data} />
                        </div>
                    );
                })
            ) : (
                <div className="rounded-md text-gray-700 text-sm">그룹 참여 요청이 없습니다</div>
            )}
        </div>
    );
}

export function MngParticipationCard(data: any) {
    const { mutate } = useMyParticipation();

    //그룹 참여 요청 승인
    async function accept(userGroupId: number) {
        toast
            .promise(
                acceptParticipation(userGroupId).catch((err) => {
                    throw new Error(err);
                }),
                {
                    loading: "Loading",
                    success: () => "그룹 입장을 승인하였습니다",
                    error: (err) => `오류 발생`,
                }
            )
            .then((res) => {
                mutate();
            });
    }

    //그룹 참여 거부
    async function deny(userGroupId: number, groupId: number) {
        toast
            .promise(
                denyParticipation(userGroupId, groupId).catch((err) => {
                    throw new Error(err);
                }),
                {
                    loading: "Loading",
                    success: () => "그룹 입장을 거부하였습니다",
                    error: (err) => `오류 발생`,
                }
            )
            .then((res) => {
                mutate();
            });
    }

    return (
        <div className="bg-neutral-50 rounded-md p-2 flex justify-between">
            <div
                className="flex flex-col gap-3
            "
            >
                <h1 className="font-bold text-lg text-gray-700">요청 유저: {data.data.user.name}</h1>
                <p className="text-sm text-gray-600 ">그룹 이름: {data.data.group.name}</p>
            </div>
            <div className="flex gap-2 items-center">
                <button
                    onClick={() => accept(data.data.id)}
                    className="text-yellow-500 p-1 rounded-md text-sm hover:text-yellow-600 font-bold"
                >
                    승인
                </button>
                <button
                    onClick={() => deny(data.data.id, data.data.group.id)}
                    className="text-red-700 hover:text-red-800 p-1 rounded-md text-sm font-bold"
                >
                    거부
                </button>
            </div>
        </div>
    );
}
