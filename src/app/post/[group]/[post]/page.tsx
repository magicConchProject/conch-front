"use client";

import LayoutContainer from "@/components/containers/LayoutContainer";
import BackIcon from "@/components/icons/BackIcon";
import AddComment from "@/components/post/AddComment";
import CommentList from "@/components/post/CommentList";
import PostDetail from "@/components/post/PostDetail";
import usePostDetail from "@/data/use-postDetail";
import { useParams, useRouter } from "next/navigation";

export default function PostDetailPage() {
    return (
        <LayoutContainer>
            <div className="pb-3">
                {/* 포스트 상세 */}
                <PostDetail />
                {/* 댓글 추가 */}
                <div className="gap-2 mb-3 ">
                    <AddComment />
                </div>
                {/* 댓글 리스트 */}
                <div className="gap-2 mb-3 ">
                    <CommentList />
                </div>
            </div>
        </LayoutContainer>
    );
}
