"use client";
import { useRecoilState } from "recoil";
import { gptConcept, gptState } from "../recoil/Recoil";
import { useEffect, useRef, useState } from "react";
import Question from "./Question";
import GtpAnswer from "./GptAnswer";
import BottomSearchBox from "./BottomSearchBox";
import Modal from "../common/Modal";
import { toast } from "react-hot-toast";
import io from "socket.io-client";
import { Select, Textarea } from "@chakra-ui/react";

export default function Gpt() {
    const [gpt, setGpt] = useRecoilState<Array<any>>(gptState);

    const ref = useRef<HTMLDivElement>(null);

    const [Selected, setSelected] = useState("gpt-3.5-turbo");

    const [concept, setConcept] = useRecoilState<string>(gptConcept);

    const [available, setAvailable] = useState<boolean>(true);

    const handleChangeSelect = (e: any) => {
        e.preventDefault();
        setSelected(e.target.value);
    };

    function Ask(ask: string) {
        setAvailable(false);
        const socket = io("http://localhost:8080");
        // const socket = io('https://limhogyun.com'); // WebSocket 서버 주소로 변경
        if (ask != "") {
            setGpt((state) => [...state, { role: "user", content: ask }]);
            setGpt((state) => [...state, { role: "assistant", content: "loading" }]);
            socket.emit("gptChat", {
                model: Selected,
                messages: [...gpt, { role: "user", content: ask }],
                concept,
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
                                                model={Selected}
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
            <div className="w-64 border-l flex flex-col">
                <section className="flex-1 relative">
                    <div className="absolute h-full w-full overflow-auto p-2">
                        <div>
                            <label className="text-sm text-gray-500 font-bold">concept</label>

                            <div className={`flex flex-col`}>
                                <Textarea
                                    resize="none"
                                    h="auto"
                                    value={concept}
                                    rows={6}
                                    onChange={(e) => {
                                        // console.log(
                                        //     e.target.scrollHeight,
                                        //     textareaRef.current?.scrollHeight && textareaRef.current.scrollHeight + 2,
                                        //     textareaHeight
                                        // );
                                        e.target.style.height = "auto";
                                        e.target.style.height = `${e.target.scrollHeight + 2}px`;

                                        setConcept(e.target.value);
                                    }}
                                    placeholder={`어떤 챗봇과 대화하고 싶나요? \n 원하는 성격, 습관, 정보를 입력해 보세요! 구체적으로 적을 수록 더 좋은 답변을 기대할 수 있습니다.`}
                                ></Textarea>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm text-gray-500 font-bold">model</label>
                            <Select className="border-2 rounded-md" name="model" onChange={handleChangeSelect}>
                                <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
                                <option value="gpt-3.5-turbo-0613">gpt-3.5-turbo-0613</option>z
                                <option value="gpt-3.5-turbo-16k">gpt-3.5-turbo-16k</option>
                                <option value="gpt-3.5-turbo-16k-0613">gpt-3.5-turbo-16k-0613</option>
                            </Select>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
