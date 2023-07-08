'use client';

import { editPost } from '@/api/post';
import CustomInput from '@/components/common/CustomInput';
import HtmlEditor from '@/components/common/HtmlEditor';
import SubmitButton from '@/components/common/SubmitButton';
import LayoutContainer from '@/components/containers/LayoutContainer';
import usePostDetail from '@/data/use-postDetail';
import useTag from '@/data/use-tag';
import { Button, Card } from '@chakra-ui/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function PostEdit() {
    const router = useRouter();
    const param = useParams();
    const { post, isEditable, mutate } = usePostDetail(param.post);

    const { tags } = useTag(Number(param.group));

    const [nowTag, setNowTag] = useState<number | null>(post?.tag?.id ? post.tag.id : null);
    //react hook form 체크
    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        if (isEditable == false) {
            toast.error('포스트를 수정할 권한이 없습니다.');
            router.replace('/');
        }
    }, [isEditable, router]);

    //html 에디터 변경 사항 체크
    let htmlValue = '';
    function getChange(value: any) {
        if (value) htmlValue = value;
    }

    const submit: SubmitHandler<any> = (data) => {
        toast
            .promise(
                editPost(post.id, data.title, htmlValue, nowTag).catch((err) => {
                    throw new Error(err);
                }),
                {
                    loading: 'Loading',
                    success: () => '포스트 수정 성공',
                    error: (err) => `${err.toString()}`,
                }
            )
            .then((res) => {
                mutate();
                router.replace(`/post/${param.group}/${post.id}`);
            });
    };

    return (
        <div className="w-full flex-1 relative">
            <div className="absolute h-full overflow-auto w-full flex justify-center">
                <LayoutContainer>
                    <div className="pb-2">
                        <div className="flex gap-2 mb-3 items-center justify-between">
                            <div className="font-bold">포스트 수정</div>
                        </div>
                        <div>
                            {post && (
                                <form className="flex flex-col gap-3" onSubmit={handleSubmit(submit)}>
                                    <CustomInput
                                        labelName="제목 입력"
                                        value={post.title}
                                        register={register}
                                        label="title"
                                        setValue={setValue}
                                    />
                                    <div>
                                        <div className="flex gap-2">
                                            <div
                                                onClick={() => setNowTag(null)}
                                                className={`text-sm p-1 px-2 rounded-lg cursor-pointer ${
                                                    nowTag == null ? 'bg-teal-600 text-white' : 'hover:bg-[#EFEFEE]'
                                                }`}
                                            >
                                                ALL
                                            </div>
                                            {tags &&
                                                tags.map((data: any, index: number) => (
                                                    <div
                                                        onClick={() => setNowTag(data.id)}
                                                        className={`text-sm p-1 px-2 rounded-lg cursor-pointer
                                                    ${
                                                        nowTag == data.id
                                                            ? 'bg-teal-600 text-white'
                                                            : 'hover:bg-[#EFEFEE]'
                                                    }`}
                                                        key={data.id}
                                                    >
                                                        {data.name}
                                                    </div>
                                                ))}
                                        </div>
                                    </div>

                                    <HtmlEditor getChange={getChange} content={post.contents} />

                                    <Button type="submit" colorScheme="teal" variant="solid" className="w-full">
                                        수정하기
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>
                </LayoutContainer>
            </div>
        </div>
    );
}
