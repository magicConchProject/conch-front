"use client";
import LayoutContainer from "@/components/containers/LayoutContainer";
import GroupGrid from "@/components/post/GroupGrid";
import Participate from "@/components/post/Participate";
import StoreGrid from "@/components/store/StoreGrid";

export default function Store() {
    return (
        <>
            <LayoutContainer>
                <div className="flex gap-2 mb-3 items-center justify-between">
                    <h1 className="text-lg font-bold text-gray-600">STORE</h1>
                </div>
                {/* <GroupGrid /> */}
                <StoreGrid />
            </LayoutContainer>
        </>
    );
}
