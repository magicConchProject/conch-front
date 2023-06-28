"use client";
import { plusView } from "@/api/post";
import LayoutContainer from "@/components/containers/LayoutContainer";
import BackIcon from "@/components/icons/BackIcon";
import AddPost from "@/components/post/AddPost";
import PostList from "@/components/post/PostList";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Post({ params }: { params: { id: string } }) {
    
    return (
        <LayoutContainer>
            <PostList />
        </LayoutContainer>
    );
}
