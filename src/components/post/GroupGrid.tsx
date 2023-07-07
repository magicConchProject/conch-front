"use client";

import GroupCard from "./GroupCard";
import useGroup from "@/data/use-group";
import { PulseLoader } from "react-spinners";
import Link from "next/link";
import Participate from "./Participate";
import { toast } from "react-hot-toast";

export default function GroupGrid() {
    //groups들 데이터 캐싱 swr hook
    const { groups, loading } = useGroup();

    return (
        <>
            {loading ? (
                <PulseLoader color="#b9b9b9" size={7} speedMultiplier={0.5} />
            ) : (
                <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {!loading &&
                        groups &&
                        groups.map((data: any) => {
                            return (
                                <div key={data.id}>
                                    {data.joined ? (
                                        <Link href={`/post/${data.group.id}`}>
                                            <li>
                                                <GroupCard
                                                    name={data.group.name}
                                                    joined={data.joined}
                                                    memberCount={data.group.memberCount}
                                                    manager={data.group.manager.name}
                                                />
                                            </li>
                                        </Link>
                                    ) : (
                                        <>
                                            <li onClick={() => toast(() => "그룹장의 승인을 기다리고 있는 그룹입니다")}>
                                                <GroupCard
                                                    name={data.group.name}
                                                    joined={data.joined}
                                                    memberCount={data.group.memberCount}
                                                    manager={data.group.manager.name}
                                                />
                                            </li>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                </ul>
            )}
        </>
    );
}
