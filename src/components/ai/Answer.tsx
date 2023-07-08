'use client';
import { PulseLoader } from 'react-spinners';
import { Disclosure } from '@headlessui/react';
import MarkdownViewer from '../common/MarkdownViewer';
import showdown from 'showdown';
import useUser from '@/data/use-user';
import { useState } from 'react';
import Modal from '../common/Modal';
import SignButton from '../sign/SignButton';
import useGroup from '@/data/use-group';
import { toast } from 'react-hot-toast';
import { addPost } from '@/api/post';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import CustomInput from '../common/CustomInput';
import HtmlEditor from '../common/HtmlEditor';
import SubmitButton from '../common/SubmitButton';
type Props = {
    A: any;
};

export default function Answer({ A }: Props) {
    const router = useRouter();
    const converter = new showdown.Converter();
    const { loggedOut } = useUser();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedGroup, setSelectedGroup] = useState<any | undefined>();

    const { groups, mutate, loading } = useGroup();

    const { register, handleSubmit } = useForm();

    function Open() {
        setModalOpen(true);
    }
    function Store(data: any) {
        if (selectedGroup) {
            toast
                .promise(
                    addPost({ title: data.title, contents: htmlValue, group_id: String(selectedGroup.group.id) }),
                    {
                        loading: 'Loading',
                        success: () => '포스팅 성공',
                        error: (err) => `${err.toString()}`,
                    }
                )
                .then((res) => {
                    mutate();
                    router.push(`/post/${selectedGroup.group.id}/${res.id}`);
                });
        } else {
            toast.error('포스팅할 그룹을 지정해 주세요');
        }
    }

    let htmlValue = '';
    function getChange(value: any) {
        if (value) htmlValue = value;
    }

    return (
        <>
            <div className="flex">
                {A === 'loading' ? (
                    <div className={`flex bg-white p-3 px-3 max-w-[800px] rounded-md ml-3 relative ${before}`}>
                        <PulseLoader color="#b9b9b9" size={7} speedMultiplier={0.5} />
                    </div>
                ) : (
                    <div
                        className={`flex bg-white p-2 lg:max-w-[750px] md:max-w-[500px] max-w-[450px] rounded-md ml-3 relative ${before} flex-col`}
                    >
                        <section className="border-b pb-2">
                            <MarkdownViewer data={A.response} />
                        </section>
                        <section className="my-2">
                            <p className="text-gray-500 text-sm px-1">
                                {A.otherChoices?.length} 개의 추가 답변이 있습니다
                            </p>

                            {A.otherChoices?.map((data: any, index: number) => {
                                return (
                                    <div key={data.choiceId} className="my-1">
                                        <Disclosure>
                                            <Disclosure.Button className="w-full bg-neutral-100 hover:bg-neutral-200 text-left text-netural-800 rounded-md p-0.5 px-2 text-sm">{`${
                                                index + 1
                                            } 번`}</Disclosure.Button>
                                            <Disclosure.Panel>
                                                <MarkdownViewer data={data.message[0]} />
                                            </Disclosure.Panel>
                                        </Disclosure>
                                    </div>
                                );
                            })}
                        </section>
                        <section className="mt-2">
                            {!loggedOut && (
                                <button
                                    onClick={Open}
                                    className="w-full bg-neutral-200 rounded-md p-2 hover:bg-neutral-300 text-neutral-600"
                                >
                                    포스팅하기
                                </button>
                            )}
                        </section>
                    </div>
                )}
            </div>

            {modalOpen && (
                <Modal
                    open={modalOpen}
                    setOpen={(open) => setModalOpen(open)}
                    title="포스트 작성"
                    maxWidth="max-w-[52rem]"
                >
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit(Store)}>
                        <div className="flex gap-2 mb-2">
                            {!loading &&
                                groups.map(
                                    (data: any) =>
                                        data.joined && (
                                            <div
                                                className={`${
                                                    selectedGroup == data
                                                        ? 'bg-yellow-400 hover:bg-yellow-500'
                                                        : 'bg-neutral-200 hover:bg-neutral-300'
                                                } text-yellow-950 p-1 rounded-md text-sm cursor-pointer`}
                                                onClick={() => setSelectedGroup(data)}
                                                key={data.id}
                                            >
                                                {data.group.name}
                                            </div>
                                        )
                                )}
                        </div>

                        <CustomInput labelName="제목 입력" register={register} label="title" />
                        <HtmlEditor
                            getChange={getChange}
                            content={`
                            <h5>ask to bard</h5>
                            <h3><strong>Q.</strong></h3>\n
                            ${A.Q}
                            <br/>
                            <h3><strong>A.</strong></h3>\n
                            ${converter.makeHtml(A.response)}

                            <hr/>
                            ${
                                A.otherChoices &&
                                A.otherChoices.map((data: any, index: number) => {
                                    return `
                                    <strong>${index + 1}. 추가답변</strong>
                                    <br/>
                                    ${data.message[0]} 
                                    <br/><br/>
                                `;
                                })
                            }
                            `}
                        />
                        <SubmitButton name="등록하기" />
                    </form>
                </Modal>
            )}
        </>
    );
}

const before = `before:border-[6px] before:border-transparent before:border-t-white before:border-r-white before:w-0 before:absolute before:top-1.5 before:left-[-10px]`;
