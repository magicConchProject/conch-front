"use client";

import { canellationGroup } from "@/api/group";
import useNotMyGroup from "@/data/use-not-my-gruop";
import toast from "react-hot-toast";

export default function MngParticipagtedGroup() {
    const { groups, mutate } = useNotMyGroup();

    function mycanellationGroup(usergroupId: number, groupId: number) {
        toast
            .promise(
                canellationGroup(usergroupId, groupId).catch((err) => {
                    throw new Error(err);
                }),
                {
                    loading: "Loading",
                    success: () => "그룹 탈퇴 성공",
                    error: (err) => `${err.toString()}`,
                }
            )
            .then(() => {
                mutate();
            });
    }

    return (
        <div className="flex flex-col mb-3 gap-3">
            {groups && groups.length > 0 ? (
                groups.map((data: any, index: number) => {
                    return (
                        <div key={data.id} className="bg-neutral-50 rounded-md p-2 flex justify-between ">
                            <div className="flex flex-col ">
                                <h1 className="font-bold text-lg text-gray-700">name: {data.group.name}</h1>
                                <p className="text-sm text-gray-600 ">manager: {data.group.manager.name}</p>
                            </div>
                            <div className="flex items-center">
                                <button
                                    onClick={() => {
                                        mycanellationGroup(data.id, data.group.id);
                                    }}
                                    className="text-red-700 hover:text-red-800 p-1 rounded-md text-sm font-bold"
                                >
                                    탈퇴하기
                                </button>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="rounded-md text-gray-700 text-sm">참여 그룹이 없습니다</div>
            )}
        </div>
    );
}
