"use client";

import LockIcon from "../icons/LockIcon";
import UnLockIcon from "../icons/UnLockIcon";

type Props = {
    name: string,
    joined: boolean,
    memberCount: number,
    manager: string
}

export default function GroupCard({name, joined, memberCount, manager} : Props) {
    // console.log(name, joined, memberCount)
    return (
        <article className={`rounded-md p-3 ${joined ? 'bg-neutral-50' : 'bg-neutral-100'} flex items-center`}>
            <div className="flex-1">
                <div className="text-lg font-bold text-gray-700">{name}</div>
                <div className="text-xs text-gray-400">멤버: {memberCount}</div>
                <div className="text-xs text-gray-400">그룹장: {manager}</div>
            </div>
            
            <div>{joined ? <UnLockIcon/> : <LockIcon/> }</div>
                
        </article>
    );
}
