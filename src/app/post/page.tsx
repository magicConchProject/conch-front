"use client";
import LayoutContainer from "@/components/containers/LayoutContainer";
import GroupGrid from "@/components/post/GroupGrid";
import Participate from "@/components/post/Participate";

export default function Group() {
    return (
        <>
            <LayoutContainer>
                <div className="flex gap-2 mb-3 items-center justify-between">
                    <h1 className="text-lg font-bold text-gray-600">GROUP LIST</h1>
                    <Participate />
                </div>
                <GroupGrid />
            </LayoutContainer>
        </>
    );
}
