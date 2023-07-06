"use client";

import useGroup from "@/data/use-group";
import useUser from "@/data/use-user";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { PulseLoader } from "react-spinners";
import showdown from "showdown";
import MarkdownViewer from "../common/MarkdownViewer";
import Modal from "../common/Modal";
import SignButton from "../sign/SignButton";
import toast from "react-hot-toast";
import { addPost } from "@/api/post";
import HtmlEditor from "../common/HtmlEditor";
import CustomInput from "../common/CustomInput";
import { useForm } from "react-hook-form";
import SubmitButton from "../common/SubmitButton";
import useTag from "@/data/use-tag";
import { Button } from "@chakra-ui/react";
type Props = {
    A: any;
    concept: string;
    model: string;
};
export default function GtpAnswer({ A, concept, model }: Props) {
    const textareaRef = useRef();
    const parentRef = useRef();

    const router = useRouter();
    const converter = new showdown.Converter();
    const { loggedOut } = useUser();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedGroup, setSelectedGroup] = useState<any | undefined>();
    const [selectedTag, setSelectedTag] = useState<any>(null);

    const { groups, mutate, loading } = useGroup();
    const { tags } = useTag(selectedGroup ? selectedGroup?.group?.id : 0);

    const [title, setTitle] = useState("");

    const { register, handleSubmit } = useForm();

    function Open() {
        setModalOpen(true);
    }

    function Store(data: any) {
        if (selectedGroup) {
            toast
                .promise(
                    addPost({
                        title: data.title,
                        contents: htmlValue,
                        group_id: String(selectedGroup.group.id),
                        tag_id: selectedTag,
                    }).catch((err) => {
                        console.log(err);
                    }),
                    {
                        loading: "Loading",
                        success: () => "포스팅 성공",
                        error: (err) => `${err.toString()}`,
                    }
                )
                .then((res) => {
                    mutate();
                    router.push(`/post/${selectedGroup.group.id}/${res.id}`);
                });
        } else {
            toast.error("포스팅할 그룹을 지정해 주세요");
        }
    }

    let htmlValue = "";
    function getChange(value: any) {
        if (value) htmlValue = value;
    }

    return (
        <>
            <div className="flex">
                {A.A === "loading" ? (
                    <div className={`flex bg-stone-100 p-3 px-3 max-w-[800px] rounded-lg ml-3 relative ${before}`}>
                        <PulseLoader color="#b9b9b9" size={7} speedMultiplier={0.5} />
                    </div>
                ) : (
                    <div
                        className={`flex bg-[#EFEFEE] p-2 px-3 lg:max-w-[800px] md:max-w-[650px] sm:max-w-[450px] rounded-lg ml-3 relative ${before} flex-col`}
                    >
                        <section className="pb-2 border-b">
                            <MarkdownViewer data={A.A} />
                        </section>

                        <section className="mt-2">
                            {!loggedOut && (
                                <Button variant="ghost" size="xs" className="w-full" onClick={Open}>
                                    이 답변 게시하기
                                </Button>
                            )}
                        </section>
                    </div>
                )}
            </div>

            {modalOpen && (
                <Modal open={modalOpen} setOpen={(open) => setModalOpen(open)} title="포스트 작성" maxWidth="max-w-[52rem]">
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit(Store)}>
                        <div className="flex gap-2 mb-2">
                            {!loading &&
                                groups.map(
                                    (data: any) =>
                                        data.joined && (
                                            <div
                                                className={`${
                                                    selectedGroup == data
                                                        ? "bg-yellow-400 hover:bg-yellow-500"
                                                        : "bg-neutral-200 hover:bg-neutral-300"
                                                } text-yellow-950 p-1 rounded-md text-sm cursor-pointer`}
                                                onClick={() => {
                                                    setSelectedGroup(data);
                                                    setSelectedTag(null);
                                                }}
                                                key={data.id}
                                            >
                                                {data.group.name}
                                            </div>
                                        )
                                )}
                        </div>
                        <div className="flex gap-2 mb-2">
                            {selectedGroup && tags && (
                                <>
                                    {" "}
                                    <div
                                        onClick={() => {
                                            setSelectedTag(null);
                                        }}
                                        className={`text-sm p-1 px-2 bg-neutral-100 rounded-lg 
                                ${selectedTag == null ? "bg-neutral-600 text-white" : "bg-white"}`}
                                    >
                                        not choice
                                    </div>{" "}
                                    {tags.map((data: any) => (
                                        <div
                                            onClick={() => {
                                                setSelectedTag(data.id);
                                            }}
                                            key={data.id}
                                            className={`text-sm p-1 px-2 bg-neutral-100 rounded-lg 
                                ${selectedTag == data.id ? "bg-neutral-600 text-white" : "bg-white"}`}
                                        >
                                            {data.name}
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                        <CustomInput labelName="제목 입력" register={register} label="title" />
                        <HtmlEditor
                            getChange={getChange}
                            content={`
                            <h5>ask to gpt</h5>
                            <strong>model</strong>: ${model}
                            <br/>
                            <h4><strong>concept</strong></h4>\n
                            ${concept}
                            <hr/>
                            <h3><strong>Q.</strong></h3>\n
                            ${A.Q}
                            <br/>
                            <h3><strong>A.</strong></h3>\n
                            ${converter.makeHtml(A.A)}
                            `}
                        />
                        <SubmitButton name="등록하기" />
                    </form>
                </Modal>
            )}
        </>
    );
}

const before = `before:border-[6px] before:border-transparent before:border-t-[#EFEFEE] before:border-r-[#EFEFEE] before:w-0 before:absolute before:top-1.5 before:left-[-10px]`;
