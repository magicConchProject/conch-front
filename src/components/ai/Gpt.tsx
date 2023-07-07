"use client";
import { useRecoilState } from "recoil";
import {
    gptConcept,
    gptFrequencyPenalty,
    gptMaximumLength,
    gptPresencePenalty,
    gptState,
    gptTamperature,
    gptTop_p,
} from "../recoil/Recoil";
import { useEffect, useRef, useState } from "react";
import Question from "./Question";
import GtpAnswer from "./GptAnswer";
import BottomSearchBox from "./BottomSearchBox";
import Modal from "../common/Modal";
import { toast } from "react-hot-toast";
import io from "socket.io-client";
import {
    Button,
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select,
    Slider,
    SliderFilledTrack,
    SliderMark,
    SliderThumb,
    SliderTrack,
    Stack,
    Text,
    Textarea,
    Tooltip,
} from "@chakra-ui/react";
import MenuIcon from "../icons/MenuIcon";

export default function Gpt() {
    //gpt 질문 이력 전역 state에 저장
    const [gpt, setGpt] = useRecoilState<Array<any>>(gptState);
    //컨셉도 전역으로 설정
    const [concept, setConcept] = useRecoilState<string>(gptConcept);
    //그럼 temperature도 전역으로 설정
    const [temperature, setTemperature] = useRecoilState<number>(gptTamperature);
    //top_p도 전역 설정
    const [topP, setTopP] = useRecoilState<number>(gptTop_p);
    //maximum_length도 전역 설정
    const [maximumLength, setMaximumLength] = useRecoilState<number>(gptMaximumLength);
    //frequency_penalty도 전역 설정
    const [frequencyPenalty, setFrequencyPenalty] = useRecoilState<number>(gptFrequencyPenalty);
    //presence_penalty도 전역 설정
    const [presencePenalty, setPresencePenalty] = useRecoilState<number>(gptPresencePenalty);

    const ref = useRef<HTMLDivElement>(null);
    //모델 설정 state
    const [Selected, setSelected] = useState("gpt-3.5-turbo");

    const [available, setAvailable] = useState<boolean>(true);

    const handleChangeSelect = (e: any) => {
        e.preventDefault();
        setSelected(e.target.value);
    };

    function Ask(ask: string) {
        setAvailable(false);
        // const socket = io("http://localhost:8080");
        const socket = io("https://limhogyun.com"); // WebSocket 서버 주소로 변경
        if (ask != "") {
            setGpt((state) => [...state, { role: "user", content: ask }]);
            setGpt((state) => [...state, { role: "assistant", content: "loading" }]);
            socket.emit("gptChat", {
                model: Selected,
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
            <div className="w-72 border-l flex flex-col">
                <section className="w-full pb-1 pt-2 px-2 border-b">
                    <Flex justifyContent="space-between" alignItems="center">
                        <h1 className="font-bold text-sm text-gray-600">create chatbot</h1>
                        <Menu>
                            <MenuButton as={IconButton} aria-label="Options" icon={<MenuIcon />} variant="outline" />
                            <MenuList>
                                <MenuItem>내 설정 불러오기</MenuItem>
                                <MenuItem>설정 초기화</MenuItem>
                                <MenuDivider />
                                <MenuItem>이 설정 저장하기</MenuItem>
                                {/* <MenuItem icon={<EditIcon />} command="⌘O">
                                    Open File...
                                </MenuItem> */}
                            </MenuList>
                        </Menu>
                    </Flex>
                </section>
                <section className="flex-1 relative">
                    <div className="absolute h-full w-full overflow-auto px-2 flex flex-col gap-4">
                        <div>
                            <Tooltip hasArrow label="대화를 하기 전 시스템이 알아야할 사전 지식을 입력합니다." placement="auto">
                                <Text fontSize="sm">Concept</Text>
                            </Tooltip>
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
                            <Tooltip
                                hasArrow
                                label="사용 모델을 지정합니다. 4K context 모델의 경우 4,000개 토큰까지 처리할 수 있습니다.[1,000개 토큰 당 0.0015달러], 16K context 모델의 경우 16,000개의 토큰까지 처리할 수 있습니다.[1,000개 토큰당 0.003달러]"
                                placement="auto"
                            >
                                <Text fontSize="sm">Model</Text>
                            </Tooltip>
                            <Select className="border-2 rounded-md" name="model" onChange={handleChangeSelect}>
                                <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
                                <option value="gpt-3.5-turbo-0613">gpt-3.5-turbo-0613</option>z
                                <option value="gpt-3.5-turbo-16k">gpt-3.5-turbo-16k</option>
                                <option value="gpt-3.5-turbo-16k-0613">gpt-3.5-turbo-16k-0613</option>
                            </Select>
                        </div>
                        <div>
                            <Flex justifyContent="space-between">
                                <Tooltip
                                    hasArrow
                                    label="샘플링 온도를 지정합니다. 0과 2사이의 범위에서 지정할 수 있으며, 0.8과 같은 높은 값은 출력을 더 무작위로 만드는 반면, 0.2와 같은 낮은 값은 더 집중되고 결정론적인 출력을 만듭니다."
                                    placement="auto"
                                >
                                    <Text fontSize="sm">Temperature</Text>
                                </Tooltip>
                                <NumberInput
                                    size="xs"
                                    maxW="65px"
                                    max={2}
                                    min={0}
                                    step={0.01}
                                    value={temperature}
                                    onChange={(val) => {
                                        setTemperature(Number(val));
                                    }}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Flex>

                            <div className="px-3 mt-2">
                                <Slider
                                    aria-label="slider-ex-2"
                                    colorScheme="teal"
                                    value={temperature}
                                    onChange={(val) => {
                                        setTemperature(val);
                                    }}
                                    min={0}
                                    max={2}
                                    step={0.01}
                                    focusThumbOnChange={false}
                                >
                                    {/* <SliderMark value={0} mt="1" ml="-2.2" fontSize="sm">
                                        0
                                    </SliderMark>
                                    <SliderMark value={2} mt="1" ml="-2.2" fontSize="sm">
                                        2
                                    </SliderMark> */}
                                    <SliderTrack>
                                        <SliderFilledTrack />
                                    </SliderTrack>
                                    <SliderThumb fontSize="sm" boxSize="32px">
                                        {temperature}
                                    </SliderThumb>
                                </Slider>
                            </div>
                        </div>

                        <div>
                            <Flex justifyContent="space-between">
                                <Tooltip
                                    hasArrow
                                    label="확률 집합을 고려하는 방법입니다. 예를 들어, 0.1은 확률 10%에 해당하는 토큰들만 고려한다는 의미 입니다."
                                    placement="auto"
                                >
                                    <Text fontSize="sm">Top P</Text>
                                </Tooltip>
                                <NumberInput
                                    size="xs"
                                    maxW="65px"
                                    max={1}
                                    min={0}
                                    step={0.01}
                                    value={topP}
                                    onChange={(val) => {
                                        setTopP(Number(val));
                                    }}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Flex>

                            <div className="px-3 mt-2">
                                <Slider
                                    aria-label="slider-ex-2"
                                    colorScheme="teal"
                                    value={topP}
                                    onChange={(val) => {
                                        setTopP(val);
                                    }}
                                    min={0}
                                    max={1}
                                    step={0.01}
                                >
                                    {/* <SliderMark value={0} mt="1" ml="-2.2" fontSize="sm">
                                        0
                                    </SliderMark>
                                    <SliderMark value={1} mt="1" ml="-2.2" fontSize="sm">
                                        1
                                    </SliderMark> */}
                                    <SliderTrack>
                                        <SliderFilledTrack />
                                    </SliderTrack>
                                    <SliderThumb fontSize="sm" boxSize="32px">
                                        {topP}
                                    </SliderThumb>
                                </Slider>
                            </div>
                        </div>
                        <div>
                            <Flex justifyContent="space-between">
                                <Tooltip hasArrow label="채팅 완성 시 생성할 토큰의 최대 개수를 지정할 수 있습니다." placement="auto">
                                    <Text fontSize="sm">Maximum length</Text>
                                </Tooltip>
                                <NumberInput
                                    size="xs"
                                    maxW="65px"
                                    max={2048}
                                    min={1}
                                    step={1}
                                    value={maximumLength}
                                    onChange={(val) => {
                                        setMaximumLength(Number(val));
                                    }}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Flex>
                            <div className="px-3 mt-2">
                                <Slider
                                    aria-label="slider-ex-2"
                                    colorScheme="teal"
                                    value={maximumLength}
                                    onChange={(val) => {
                                        setMaximumLength(val);
                                    }}
                                    min={1}
                                    max={2048}
                                    step={1}
                                >
                                    {/* <SliderMark value={0} mt="1" ml="-2.2" fontSize="sm">
                                        0
                                    </SliderMark>
                                    <SliderMark value={2048} mt="1" ml="-4" fontSize="sm">
                                        2048
                                    </SliderMark> */}
                                    <SliderTrack>
                                        <SliderFilledTrack />
                                    </SliderTrack>
                                    <SliderThumb fontSize="sm" boxSize="32px">
                                        {maximumLength}{" "}
                                    </SliderThumb>
                                </Slider>
                            </div>
                        </div>
                        <div>
                            <Flex justifyContent="space-between">
                                <Tooltip
                                    hasArrow
                                    label="-2.0과 2.0 사이의 숫자 중 양수는 현재까지 텍스트에서 토큰의 빈도에 따라 새로운 토큰에 벌점을 주어 동일한 문장을 그대로 반복하는 모델의 확률을 감소시킵니다."
                                    placement="auto"
                                >
                                    <Text fontSize="sm">Frequency penalty</Text>
                                </Tooltip>
                                <NumberInput
                                    size="xs"
                                    maxW="65px"
                                    max={2}
                                    min={-2}
                                    step={0.01}
                                    value={frequencyPenalty}
                                    onChange={(val) => {
                                        setFrequencyPenalty(Number(val));
                                    }}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Flex>
                            <div className="px-3 mt-2">
                                <Slider
                                    aria-label="slider-ex-2"
                                    colorScheme="teal"
                                    value={frequencyPenalty}
                                    min={-2}
                                    max={2}
                                    step={0.01}
                                    onChange={(val) => {
                                        setFrequencyPenalty(val);
                                    }}
                                >
                                    {/* <SliderMark value={-2} mt="1" ml="-2.3" fontSize="sm">
                                        -2
                                    </SliderMark>
                                    <SliderMark value={2} mt="1" ml="-2.2" fontSize="sm">
                                        2
                                    </SliderMark> */}
                                    <SliderTrack>
                                        <SliderFilledTrack />
                                    </SliderTrack>
                                    <SliderThumb fontSize="sm" boxSize="32px">
                                        {frequencyPenalty}
                                    </SliderThumb>
                                </Slider>
                            </div>
                        </div>
                        <div>
                            <Flex justifyContent="space-between">
                                <Tooltip
                                    hasArrow
                                    label="-2.0과 2.0 사이의 숫자는 음수면 이전 텍스트에 해당하는 토큰이 나타나면 모델의 새로운 주제에 대한 확률이 증가하여 새로운 토픽에 대해 말하려는 경향이 강화되고 양수면 그 반대입니다."
                                    placement="auto"
                                >
                                    <Text fontSize="sm">Presence penalty</Text>
                                </Tooltip>
                                <NumberInput
                                    size="xs"
                                    maxW="65px"
                                    max={2}
                                    min={-2}
                                    step={0.01}
                                    value={presencePenalty}
                                    onChange={(val) => {
                                        setPresencePenalty(Number(val));
                                    }}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Flex>
                            <div className="px-3 mt-2">
                                <Slider
                                    aria-label="slider-ex-2"
                                    colorScheme="teal"
                                    value={presencePenalty}
                                    min={-2}
                                    max={2}
                                    step={0.01}
                                    onChange={(val) => setPresencePenalty(val)}
                                >
                                    {/* <SliderMark value={-2} mt="1" ml="-2.3" fontSize="sm">
                                        -2
                                    </SliderMark>
                                    <SliderMark value={2} mt="1" ml="-2.2" fontSize="sm">
                                        2
                                    </SliderMark> */}
                                    <SliderTrack>
                                        <SliderFilledTrack />
                                    </SliderTrack>
                                    <SliderThumb fontSize="sm" boxSize="32px">
                                        {presencePenalty}
                                    </SliderThumb>
                                </Slider>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <Button sx={{ borderRadius: "none" }} colorScheme="teal" variant="solid" className="w-full">
                        내 챗봇 게시하기
                    </Button>
                </section>
            </div>
        </div>
    );
}
