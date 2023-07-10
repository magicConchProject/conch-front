"use client";

import { useParams } from "next/navigation";
import CommentCard from "./CommentCard";
import useComment from "@/data/use-comment";

export default function CommentList() {
    const params = useParams();

    const post_id = params.post;
    const { comments, mutate, loading } = useComment(post_id);

    return (
        <ul className="flex flex-col divide-y divide-slate-200">
            {!loading &&
                comments.length > 0 &&
                comments.map((data: any, index: number) => {
                    return (
                        <li key={data.comment_id} className="py-1">
                            <CommentCard
                                comment={data.comment_comment}
                                commentDate={data.comment_commentDate}
                                username={data.user_name}
                                isEditable={data.isEditable}
                                commentid={data.comment_id}
                            />
                        </li>
                    );
                })}
        </ul>
    );
}
