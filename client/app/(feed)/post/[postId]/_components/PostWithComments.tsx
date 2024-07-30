"use client";
import { CommentType } from "@/types/CommentType"
import CommentCard from "./CommentCard";
import { Separator } from "@radix-ui/react-dropdown-menu";
import CommentForm from "./CommentForm";
import { PostType } from "@/types/PostType";
import PostCard from "@/app/(feed)/_components/PostCard";
import { Fragment, useState } from "react";

interface PostWithCommentsProps {
    postId: string,
    post: PostType,
    initialComments: CommentType[]
}

const PostWithComments = ({ postId, post, initialComments }: PostWithCommentsProps) => {

    const [numComments, setComments] = useState(post.numComments);

    return (
        <>
            <PostCard post={post} isDedicatedPage={true} comments={numComments}/>
            <CommentForm postId={postId} setNumComments={setComments}/>
            <Separator className="dark:bg-neutral-700 h-[1px] my-2" />
            {initialComments && initialComments.map((comment: CommentType) => {
                return (
                    <Fragment key={`fragment-${comment._id}`}>
                        <CommentCard comment={comment} key={comment._id} />
                        <Separator className="dark:bg-neutral-700 h-[1px]" key={`separator-${comment._id}`} />
                    </Fragment>
                );
            })}
        </>
    )
}

export default PostWithComments