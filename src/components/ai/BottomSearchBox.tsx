"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SendIcon from "../icons/SendIcon";
import SendIconDisable from "../icons/SendIcon_disable";
import { Textarea } from "@chakra-ui/react";

type Props = {
    Ask: (answer: string) => void;
    available?: boolean;
};

export default function BottomSearchBox({ Ask, available }: Props) {
    const [answer, setAnswer] = useState<string>("");
    function submit() {
        // console.log(available)
        if (available) {
            setAnswer("");
            Ask(answer);
        }
    }

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const handleResizeHeight = useCallback(() => {
        // console.log(textareaRef.current?.style.height, textareaRef.current?.scrollHeight);
        if (textareaRef.current !== null) {
            /* ref.current 속성 사용 */
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, []);

    useEffect(() => {
        handleResizeHeight();
    }, [answer]);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                submit();
            }}
            className="flex p-1 border-t"
        >
            <Textarea
                border={"none"}
                focusBorderColor="none"
                rows={1}
                ref={textareaRef}
                className={`w-[100%] resize-none border-2 rounded-md`}
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
                            if (!available) {
                                setAnswer(() => answer.slice(0, -1));
                                // handleResizeHeight();
                            } else {
                                setAnswer(() => "");
                            }
                        }
                    }
                }}
                onChange={(e) => {
                    // e.target.style.height = "auto";
                    // e.target.style.height = `${e.target.scrollHeight}px`;
                    setAnswer(e.target.value);
                }}
                value={answer}
            />
            <button type="submit" className="px-4">
                {available ? <SendIcon /> : <SendIconDisable />}
            </button>
        </form>
    );
}
