"use client";
import { useRecoilState } from "recoil";
import { gptConcept, gptState } from "../recoil/Recoil";
import { useEffect, useRef, useState } from "react";
import Question from "./Question";
import GtpAnswer from "./GptAnswer";
import BottomSearchBox from "./BottomSearchBox";
import { OpenAiAsk } from "@/api/ai";
import Modal from "../common/Modal";
import { toast } from "react-hot-toast";
import io from "socket.io-client";

export default function Gpt() {
    const [gpt, setGpt] = useRecoilState<Array<any>>(gptState);

    const ref = useRef<HTMLDivElement>(null);

    const [Selected, setSelected] = useState("gpt-3.5-turbo");

    const [modalOpen, setModalOpen] = useState<boolean>(false);

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

    return (
        <div className="flex flex-col flex-1 text-gray-850 text-base">
            {/* 채팅 섹션 */}
            <section className="flex-1 relative">
                <div ref={ref} className="absolute h-full w-full overflow-auto bg-[#bacee0] p-2">
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
                <div className="p-1 flex items-center gap-4">
                    <div>
                        <label className="text-sm text-gray-500 font-bold">concept: </label>
                        <button
                            className="bg-yellow-400 p-1 px-2 rounded-md hover:bg-yellow-500 text-xs text-yellow-900 font-bold"
                            onClick={() => setModalOpen(true)}
                        >
                            set-up concept
                        </button>
                    </div>
                    <div>
                        <label className="text-sm text-gray-500 font-bold">model: </label>
                        <select className="border-2 rounded-md" name="model" onChange={handleChangeSelect}>
                            <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
                            <option value="gpt-3.5-turbo-0613">gpt-3.5-turbo-0613</option>
                            <option value="gpt-3.5-turbo-16k">gpt-3.5-turbo-16k</option>
                            <option value="gpt-3.5-turbo-16k-0613">gpt-3.5-turbo-16k-0613</option>
                        </select>
                    </div>
                </div>
                <BottomSearchBox Ask={Ask} available={available} />
            </section>

            {modalOpen && (
                <Modal open={modalOpen} setOpen={(open) => setModalOpen(open)} title="컨셉 지정하기" maxWidth="max-w-[52rem]">
                    <textarea
                        className="min-h-[400px] border-2 border-gray-300 rounded-md w-full"
                        placeholder={`(지정하지 않으면 일반 챗봇과 비슷합니다. 아래와 같이 컨셉을 지정해 즐겁게 대화해보세요!!)\n\n1. 말 끝에 '냥'을 붙여서 말해봐.\n2. 너는 고양이 나라에서 온 귀여운 고양이야`}
                        value={concept}
                        onChange={(e) => {
                            setConcept(e.target.value);
                        }}
                    ></textarea>
                </Modal>
            )}
        </div>
    );
}
