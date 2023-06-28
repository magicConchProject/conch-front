import useMyComment from "@/data/use-my-comment"
import HtmlViewer from "../common/HtmlViewer";
import { toast } from "react-hot-toast";
import { deleteComment, editComment } from "@/api/comment";
import moment from "moment";
import { useState } from "react";
import Modal from "../common/Modal";
import HtmlEditor from "../common/HtmlEditor";
import SubmitButton from "../common/SubmitButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { errorMonitor } from "events";
export default function MngMyComment() {
  const { comments } = useMyComment();

  return <div className="flex flex-col gap-3">{
    comments && comments.length > 0 ? comments.map((data: any, index: number) => {
      return (<div key={data.id}>
        <MngMyCommentCard data={data}/>
      </div>)
    }) : <div className="rounded-md text-gray-700 text-sm">댓글이 없습니다</div>
  }</div>
}

export function MngMyCommentCard(data: any) {
  const {mutate} = useMyComment();
  const [modalOpen, setModalOpen] = useState(false);
  const { handleSubmit } = useForm();

  function deleteMyComment(comment_id: number) {
    toast.promise(deleteComment(comment_id).catch((err) => {throw new Error(err)}), {
      loading: "Loading",
      success: () => "댓글을 삭제했습니다",
      error: (err) => `${err.toString()}`,
    }).then((res) => {
      mutate()
    })
  }

  const submit:  SubmitHandler<any> = () => {
    toast.promise(
      editComment(data.data.id, htmlValue).catch((err) => {throw new Error(err)})
    , {
      loading: "Loading",
      success: () => "댓글을 수정했습니다",
      error: (err) => `${err.toString()}`,
    }).then((res) => {
      setModalOpen(false)
      mutate()
    })
  }

  let htmlValue = "";
  function getChange(value: any) {
      if (value) htmlValue = value;
  }

  return <div className="bg-neutral-50 rounded-md p-2 flex flex-col">
    <div className="flex justify-between">
      <h1 className="font-bold text-lg text-gray-700">{data.data.post.title}</h1>
      <div className="flex gap-2 items-center">
        <button onClick={() => setModalOpen(true)} className="text-yellow-500 p-1 rounded-md text-sm hover:text-yellow-600 font-bold">edit</button>
        <button onClick={() => deleteMyComment(data.data.id)} className="text-red-700 hover:text-red-800 p-1 rounded-md text-sm font-bold">delete</button>
      </div>
    </div>
    <p className="text-xs text-gray-600 ">작성일: {moment(data.data.postDate).format("YYYY-MM-DD")}</p>
    <div className="border-2 rounded-md mt-3">
      <HtmlViewer text={data.data.comment}/>
    </div>

    {modalOpen && (
      <Modal open={modalOpen} setOpen={(open) => setModalOpen(open)} title="댓글 달기" maxWidth="max-w-[52rem]">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(submit)}>
          <HtmlEditor getChange={getChange} content={data.data.comment}/>
          <SubmitButton name="수정하기" />
        </form>
      </Modal>
    )}
  </div>
}