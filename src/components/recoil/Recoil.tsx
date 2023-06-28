"use client";

import { RecoilRoot, atom } from "recoil";

//bard 답변 상태 저장
export const bardState = atom<Array<any>>({
    key: "bardState",
    default: [],
});

//gpt 답변 상태 저장
export const gptState = atom<Array<any>>({
    key: "gptState",
    default: [],
});

export const gptConcept = atom<string>({
    key: "gptConcept",
    default: ''
})

//gpt image 답변 상태 저장
export const gptImage = atom<Array<any>>({
    key: "gptImageState",
    default: [],
});

//사비드 바 답변 상태 저장
export const sideNavState = atom<string>({
    key: "sideNavState",
    default: "bard",
});


export default function Recoil({ children }: { children: React.ReactNode }) {
    return <RecoilRoot>{children}</RecoilRoot>;
}
