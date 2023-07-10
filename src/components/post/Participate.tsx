"use client";
import { useState } from "react";
import PlusIcon from "../icons/PlusIcon";

import CustomInput from "../common/CustomInput";
import SubmitButton from "../common/SubmitButton";
import { SubmitHandler, useForm } from "react-hook-form";
import SignButton from "../sign/SignButton";
import toast from "react-hot-toast";
import useGroup from "@/data/use-group";
import { participate, searchGroup } from "@/api/group";
import {
    Box,
    Button,
    Flex,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Radio,
    RadioGroup,
    Stack,
    useDisclosure,
} from "@chakra-ui/react";
import IndoorIcon from "../icons/IndoorIcon";
import React from "react";

export default function ParticipateButton() {
    //새 그룹 만들기 모달창용 state
    const [ModalOpen, setModalOpen] = useState<boolean>(false);
    //검색 결과 저장용 state
    const [mySearch, setMySearch] = useState<Array<any>>([]);
    //참여 그룹 선택
    const [selectedGroup, setSelectedGroup] = useState<Object | null>(null);
    //검색용 react-hook-form
    const { register, handleSubmit } = useForm();

    const { mutate } = useGroup();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef(null);

    const [value, setValue] = React.useState("");

    //그룹 검색 기능
    const submit: SubmitHandler<any> = (data) => {
        toast.promise(
            searchGroup(data)
                .then((res) => {
                    setMySearch(() => {
                        return [...res];
                    });
                })
                .catch((err) => {
                    throw new Error(err);
                }),
            {
                loading: "Loading",
                success: () => "검색 성공",
                error: (err) => `검색 실패`,
            }
        );
    };

    //group 선택
    const selectGroup = (data: any) => {
        setSelectedGroup(data);
    };

    //선택 그룹 저장
    const selectedGroupSubmit = () => {
        if (!selectedGroup) {
            return toast.error("선택된 그룹이 없습니다.");
        }
        toast
            .promise(participate(selectedGroup), {
                loading: "Loading",
                success: () => "그룹 참여 요청 성공",
                error: (err) => `오류 발생`,
            })
            .then((res) => {
                if (res.message == "success") {
                    onClose();
                    mutate();
                }
            });
    };

    return (
        <>
            <Button onClick={onOpen} size="sm" variant="ghost">
                <IndoorIcon />
                <p className="ml-1 text-teal-600">새 그룹 참여</p>
            </Button>

            <Modal onClose={onClose} finalFocusRef={btnRef} isOpen={isOpen} scrollBehavior="inside" isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>새 그룹 참여하기</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form className="flex flex-col gap-3 mb-3" onSubmit={handleSubmit(submit)}>
                            <InputGroup size="md">
                                <Input
                                    {...register("name", { required: true })}
                                    pr="4.5rem"
                                    type="text"
                                    placeholder="참여할 그룹을 입력하세요"
                                />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" type="submit">
                                        검색
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </form>
                        <RadioGroup onChange={setValue} value={value}>
                            <Stack>
                                {mySearch.length == 0 ? (
                                    <div>결과 없음</div>
                                ) : (
                                    mySearch.map((data, index) => {
                                        return (
                                            <Box key={data.id} width="100%" onClick={() => selectGroup(data)}>
                                                <div>
                                                    <Radio width="100%" value={`${index}`} colorScheme="teal">
                                                        {data.name}
                                                    </Radio>
                                                </div>
                                            </Box>
                                        );
                                    })
                                )}
                            </Stack>
                        </RadioGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={selectedGroupSubmit} colorScheme="teal" variant="solid" className="w-full">
                            참여하기
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
