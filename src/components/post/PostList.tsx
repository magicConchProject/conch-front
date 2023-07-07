"use client";

import usePost from "@/data/use-post";
import PostCard from "./PostCard";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import BackIcon from "../icons/BackIcon";
import CustomButton from "../common/CustomButton";
import { searchGroup } from "@/api/group";
import { SubmitHandler, useForm } from "react-hook-form";
import TagList from "./TagList";
import useTag from "@/data/use-tag";
import Modal from "../common/Modal";
import CustomInput from "../common/CustomInput";
import SubmitButton from "../common/SubmitButton";
import toast from "react-hot-toast";
import { addTag } from "@/api/tag";
import TagSetting from "./TagSetting";
import { Button, Input, InputGroup, InputLeftElement, InputRightElement, Select } from "@chakra-ui/react";
import PlusIcon from "../icons/PlusIcon";

export default function PostList() {
    const params = useParams();

    const group_id = params.group;
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [order, setOrder] = useState("postDate");
    const [searchOption, setSearchOption] = useState("title");
    const [serachValue, setSearchValue] = useState("");

    const [nowTag, setNowTag] = useState<number | null>(null);

    const [select, setSelect] = useState("title");

    const { posts, total, mutate, loading, group_name, isManager } = usePost(
        group_id,
        page,
        limit,
        order,
        searchOption,
        serachValue,
        nowTag
    );
    const handlePageClick = (e: any) => {
        setPage(e.selected + 1);
    };

    const handleChangeSelect = (e: any) => {
        e.preventDefault();
        setLimit(e.target.value);
        setPage(1);
    };

    const handleChangeOrder = (e: any) => {
        e.preventDefault();
        setOrder(e.target.value);
        setPage(1);
    };

    const router = useRouter();

    //검색용 react-hook-form
    const { register, handleSubmit } = useForm();

    const submitSearch = (data: any) => {
        setSearchOption(data.searchOption);
        setSearchValue(data.searchValue);
    };

    // 태그 생성 모달!
    const tags = useTag(Number(params.group));
    const [ModalOpen, setModalOpen] = useState(false);

    const submit: SubmitHandler<any> = (data) => {
        toast
            .promise(addTag({ group_id: Number(group_id), name: data.name }), {
                loading: "Loading",
                success: () => "태그 생성 성공",
                error: (err) => `${err.toString()}`,
            })
            .then((res) => {
                tags.mutate();
                setModalOpen(false);
            });
    };

    return (
        <>
            <div className="flex gap-2 mb-3 items-center justify-between">
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            router.replace("/post");
                        }}
                    >
                        <BackIcon />
                    </button>
                    {/* 포스트 리스트 */}
                    <h1 className="text-lg font-bold text-gray-600">{group_name}</h1>
                </div>

                {/* <AddPost page={page} limit={limit}/> */}
                <div className="flex items-center gap-3">
                    {isManager && <TagSetting />}
                    <Link href={`/postadd/${group_id}`}>
                        <Button colorScheme="teal" size="sm">
                            <PlusIcon />
                            <p className="ml-1">새 포스트</p>
                        </Button>
                    </Link>
                </div>
            </div>

            {/* 태그 부분 */}
            <div className="pb-2">
                <TagList tag={nowTag} setTag={setNowTag} />
            </div>

            <div className="flex justify-between items-center">
                {!loading && (
                    <>
                        <form onSubmit={handleSubmit(submitSearch)}>
                            <InputGroup size="md" variant={"none"}>
                                <InputLeftElement width="4.5rem">
                                    <select {...register("searchOption")} className="text-sm bg-[#EFEFEE] p-1 rounded-md">
                                        <option value="title">제목</option>
                                        <option value="name">작성자</option>
                                    </select>
                                </InputLeftElement>
                                <Input {...register("searchValue")} pl="4.8rem" pr="4.7rem" type="text" placeholder="검색어 입력" />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" type="submit" colorScheme="teal">
                                        검색
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </form>
                        <div className="flex gap-2">
                            <select className="mb-3 text-sm p-1 rounded-md bg-[#EFEFEE]" value={order} onChange={handleChangeOrder}>
                                <option value="postDate">등록일</option>
                                <option value="views">조회수</option>
                            </select>
                            <select
                                className="mb-3 p-1 rounded-md text-sm rounded-md bg-[#EFEFEE]"
                                value={limit}
                                onChange={handleChangeSelect}
                            >
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                        </div>
                    </>
                )}
            </div>

            <ul className="flex flex-col gap-2">
                {!loading &&
                    posts.length > 0 &&
                    posts.map((data: any, index: number) => {
                        return (
                            <Link href={`/post/${group_id}/${data.id}`} key={data.id}>
                                <li>
                                    <PostCard title={data.title} postDate={data.postDate} writer={data.user.name} views={data.views} />
                                </li>
                            </Link>
                        );
                    })}
            </ul>
            {!loading && posts.length > 0 && <div>{renderPagination(Math.ceil(total / limit), page, handlePageClick)}</div>}

            {ModalOpen && (
                <Modal open={ModalOpen} setOpen={(open) => setModalOpen(open)} title="새 태그 만들기">
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit(submit)}>
                        <CustomInput labelName="제목 입력" register={register} label="name" />

                        <SubmitButton name="생성하기" />
                    </form>
                </Modal>
            )}
        </>
    );
}

export function renderPagination(totalPages: number, currentPage: number, handlePageClick: any) {
    return (
        <div className="flex w-full mt-3 justify-center pb-3">
            <ReactPaginate
                className="flex justify-center items-center gap-1 p-1 text-gray-500"
                pageCount={totalPages}
                // initialPage={currentPage - 1}
                forcePage={currentPage - 1}
                onPageChange={handlePageClick}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                containerClassName={"pagination"}
                activeClassName={"active"}
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link px-3 py-1"}
                previousClassName={"font-bold rounded-md px-3 py-1"}
                nextClassName={"font-bold rounded-md px-3 py-1"}
                disabledClassName={"text-gray-400"}
                activeLinkClassName={"bg-teal-600 text-white font-bold rounded-md px-3 py-1"}
                previousLinkClassName={"text-gray-400"}
                nextLinkClassName={"text-gray-400"}
            />
        </div>
    );
}
