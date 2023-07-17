"use client";

import useStoreList from "@/data/use-store-list";
import { PulseLoader } from "react-spinners";
import StoreCard from "./StoreCard";
import { describe } from "node:test";
import Link from "next/link";

export default function StoreGrid() {
    const { data, loading } = useStoreList();
    // console.log(data);
    return (
        <>
            {loading ? (
                <PulseLoader color="#b9b9b9" size={7} speedMultiplier={0.5} />
            ) : (
                <ul className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {!loading &&
                        data &&
                        data.map((data: any) => {
                            return (
                                <div key={data.id}>
                                    <Link href={`/store/${data.id}`}>
                                        <li>
                                            <StoreCard title={data.title} describtion={data.describtion} name={data.user.name} />
                                        </li>
                                    </Link>
                                </div>
                            );
                        })}
                </ul>
            )}
        </>
    );
}
