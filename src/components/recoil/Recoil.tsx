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
    default: "",
});

export const gptTamperature = atom<number>({
    key: "gptTemperature",
    default: 1,
});

export const gptMaximumLength = atom<number>({
    key: "gptMaxTokens",
    default: 512,
});

export const gptTop_p = atom<number>({
    key: "gptTop_p",
    default: 1,
});

export const gptFrequencyPenalty = atom<number>({
    key: "gptFrequencyPenalty",
    default: 0,
});

export const gptPresencePenalty = atom<number>({
    key: "gptPresencePenalty",
    default: 0,
});

//gpt image 답변 상태 저장
export const gptImage = atom<Array<any>>({
    key: "gptImageState",
    default: [],
});

//사비드 바 답변 상태 저장
export const sideNavState = atom<string>({
    key: "sideNavState",
    default: "",
});

export default function Recoil({ children }: { children: React.ReactNode }) {
    return <RecoilRoot>{children}</RecoilRoot>;
}
