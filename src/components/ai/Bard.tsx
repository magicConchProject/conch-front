"use client";
import { useEffect, useRef, useState } from "react";
import BottomSearchBox from "./BottomSearchBox";
import Question from "./Question";
import Answer from "./Answer";
import { useRecoilState } from "recoil";
import { bardState } from "../recoil/Recoil";
import { bardAsk } from "@/api/ai";
import SideNav from "../SideNav";
import toast from "react-hot-toast";
export default function Bard() {
    const [text, setText] = useRecoilState<Array<any>>(bardState);
    // const [text, setText] = useState<Array<any>>([]);
    const ref = useRef<HTMLDivElement>(null);
    const [available, setAvailable] = useState<boolean>(true);
    function Ask(answer: string) {
        setAvailable(false)
        if (answer != "") {
            setText((state) => [...state, { Q: answer }]);
            setText((state) => [...state, { A: "loading" }]);
            bardAsk(answer)
                .then((res: any) => {
                    res["Q"] = answer;
                    setText((state) => {
                        let temp = [...state];
                        temp.pop();
                        return [...temp, { A: res }];
                    });
                    setAvailable(true)
                })
                .catch((err) => {
                    toast.error("에러가 발생했습니다. 다시 시도해 주세요");
                    setText((state) => {
                        let temp = [...state];
                        temp.pop();
                        temp.pop();
                        return [...temp];
                    });
                    setAvailable(true)
                });
        }
    }

    //텍스트가 변경되었을 시 스크롤을 가장 하단으로 이동
    useEffect(() => {
        ref.current?.scrollTo(0, ref.current?.scrollHeight);
    }, [text]);

    return (
        <div className="flex flex-col flex-1 text-gray-850 text-base">
            <section className="flex-1 relative">
                <div ref={ref} className="absolute h-full w-full overflow-auto bg-[#bacee0] p-2">
                    {text &&
                        text.map((data, index) => {
                            return (
                                <div key={index} style={{ whiteSpace: "pre-line" }} className="mb-4">
                                    {data["Q"] ? <Question Q={data["Q"]} /> : <Answer A={data["A"]} />}
                                </div>
                            );
                        })}
                </div>
            </section>

            <section className="w-full">
                <BottomSearchBox Ask={Ask} available={available}/>
            </section>
        </div>
    );
}
