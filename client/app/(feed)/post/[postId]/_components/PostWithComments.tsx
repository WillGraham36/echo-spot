"use client";
import { CommentType } from "@/types/CommentType"
import CommentCard from "./CommentCard";
import { Separator } from "@radix-ui/react-dropdown-menu";
import CommentForm from "./CommentForm";
import { PostType } from "@/types/PostType";
import PostCard from "@/app/(feed)/_components/PostCard";
import { Fragment } from "react";

interface PostWithCommentsProps {
    postId: string,
    post: PostType,
    initialComments: CommentType[]
}

const PostWithComments = ({ postId, post, initialComments }: PostWithCommentsProps) => {

    return (
        <>
            <PostCard post={post} isDedicatedPage={true} />
            <CommentForm postId={postId} />
            {initialComments && initialComments.map((comment: CommentType) => {
                return (
                    <Fragment key={`fragment-${comment._id}`}>
                        <CommentCard comment={comment} key={comment._id} />
                        <Separator className="dark:bg-muted-foreground h-[1px]" key={`separator-${comment._id}`} />
                    </Fragment>
                );
            })}
        </>
    )
}

export default PostWithComments