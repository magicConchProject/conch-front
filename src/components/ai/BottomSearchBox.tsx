"use client";

import { useState } from "react";
import SendIcon from "../icons/SendIcon";
import SendIconDisable from "../icons/SendIcon_disable";

type Props = {
    Ask: (answer: string) => void;
    available?: boolean
};

export default function BottomSearchBox({ Ask, available }: Props) {
    const [answer, setAnswer] = useState<string>("");
    function submit() {
        // console.log(available)
        if(available){
            setAnswer('');
            Ask(answer);
        }
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                submit();
            }}
            className="flex p-1"
        >
            <textarea
                rows={5}
                className="w-[100%] resize-none border-2 rounded-md"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        if (!e.shiftKey) {
                            submit();
                        }
                    }
                }}
                onKeyUp={(e) => {
                    if (e.key === "Enter") {
                        if (!e.shiftKey) {
                            if(!available){
                                setAnswer(() => answer.slice(0, -1))
                            }else{
                                setAnswer(() => "");
                            }
                        }
                    }
                }}
                onChange={(e) => {
                    setAnswer(e.target.value);
                }}
                value={answer}
            />
            <button type="submit" className="p-4">
                {available ? <SendIcon /> : <SendIconDisable/>} 
                
            </button>
        </form>
    );
}
