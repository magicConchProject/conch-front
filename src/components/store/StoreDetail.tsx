"use client";

import { useRecoilState } from "recoil";
import {
    gptConcept,
    gptFrequencyPenalty,
    gptMaximumLength,
    gptPresencePenalty,
    gptSelectedModel,
    gptState,
    gptTamperature,
    gptTop_p,
} from "../recoil/Recoil";
import { useEffect, useRef, useState } from "react";
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure } from "@chakra-ui/react";
import React from "react";
import toast from "react-hot-toast";
import Question from "../ai/Question";
import GtpAnswer from "../ai/GptAnswer";
import BottomSearchBox from "../ai/BottomSearchBox";
import { SettingComponent } from "../ai/Gpt";
import { io } from "socket.io-client";
import { getStoreDetailData } from "@/api/store";
import { useParams } from "next/navigation";

export default function StoreDetail() {
    const [concept, setConcept] = useState<string>("");
    const [temperature, setTemperature] = useState<number>(1);
    const [topP, setTopP] = useState<number>(1);
    const [maximumLength, setMaximumLength] = useState<number>(512);
    const [frequencyPenalty, setFrequencyPenalty] = useState<number>(0);
    const [presencePenalty, setPresencePenalty] = useState<number>(0);

    const params = useParams();
    useEffect(() => {
        getStoreDetailData(params.id).then((res) => {
            setConcept(res.concept);
            setTemperature(res.temperature);
            setTopP(res.topP);
            setMaximumLength(res.maximumLength);
            setFrequencyPenalty(res.frequencyPenalty);
            setPresencePenalty(res.presencePenalty);
        });
    }, []);

    //gpt 질문 이력 전역 state에 저장
    const [gpt, setGpt] = useRecoilState<Array<any>>(gptState);

    const ref = useRef<HTMLDivElement>(null);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef(null);

    const [selectedModel, setSelectedModel] = useRecoilState<string>(gptSelectedModel);

    const [available, setAvailable] = useState<boolean>(true);

    function Ask(ask: string) {
        setAvailable(false);
        const socket = io("http://localhost:8080");
        // const socket = io("https://limhogyun.com"); // WebSocket 서버 주소로 변경
        if (ask != "") {
            setGpt((state) => [...state, { role: "user", content: ask }]);
            setGpt((state) => [...state, { role: "assistant", content: "loading" }]);
            socket.emit("gptChat", {
                model: selectedModel,
                messages: [...gpt, { role: "user", content: ask }],
                concept,
                temperature,
                topP,
                maximumLength,
                frequencyPenalty,
                presencePenalty,
            });
            socket.on("connect", () => {
                console.log("WebSocket connected");
                // WebSocket 연결 성공 시 동작할 로직
            });
            socket.on("gptResponse", (data) => {
                // console.log('Received gptResponse:', data);
                // gptResponse 이벤트 수신 시 동작할 로직
                setGpt((state) => {
                    let temp = [...state];
                    let myState = temp.pop();
                    if (data == "error") {
                        toast.error("에러가 발생하였습니다. 나중에 다시 시도해 주세요");
                        temp.pop();
                        socket.disconnect();
                        setAvailable(true);
                        return [...temp];
                    }
                    if (myState.content == "loading") {
                        return [...temp, { role: "assistant", content: data }];
                    } else {
                        if (data != "[DONE]") {
                            return [...temp, { role: "assistant", content: myState.content + data }];
                        } else {
                            socket.disconnect();
                            setAvailable(true);
                            return state;
                        }
                    }
                });
            });
        }
    }

    //gpt 텍스트가 변경되었을 경우 스크롤을 가장 하단으로 이동
    useEffect(() => {
        ref.current?.scrollTo(0, ref.current?.scrollHeight);
    }, [gpt]);

    //concept 텍스트를 적었을 경우 쓴만큼 늘어나게

    return (
        <div className="flex-1 flex ">
            <div className="flex flex-col flex-1 text-gray-850 text-base">
                {/* 채팅 섹션 */}
                <section className="flex-1 relative">
                    <div ref={ref} className="absolute h-full w-full overflow-auto p-2">
                        {gpt &&
                            gpt.map((data, index) => {
                                return (
                                    <div key={index} style={{ whiteSpace: "pre-line" }} className="mb-4">
                                        {data["role"] === "user" ? (
                                            <Question Q={data["content"]} />
                                        ) : (
                                            <GtpAnswer
                                                A={{ Q: gpt[index - 1]["content"], A: data["content"] }}
                                                concept={concept}
                                                model={selectedModel}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                </section>
                {/* 검색 창 섹션 */}
                <section className="w-full">
                    <BottomSearchBox Ask={Ask} available={available} />
                </section>
            </div>
        </div>
    );
}
