"use client";
import { CommentType } from "@/types/CommentType"
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import { PostType } from "@/types/PostType";
import PostCard from "@/app/(feed)/_components/PostCard";
import { Fragment, useState } from "react";
import { Separator } from "@/components/ui/separator";

interface PostWithCommentsProps {
    postId: string,
    post: PostType,
    initialComments: CommentType[]
}

const PostWithComments = ({ postId, post, initialComments }: PostWithCommentsProps) => {

    const [numComments, setComments] = useState(post.comments.length);

    // Extract all child IDs
    const childIds = new Set<string>();
    initialComments.forEach(comment => {
        comment.childIds?.forEach(childId => {
            childIds.add(childId);
        });
    });
    const topLevelComments = initialComments.filter(comment => !childIds.has(comment._id));

    const renderComments = (comments: CommentType[], level: number, parentNumber?: number) => {
        return comments.map((comment: CommentType) => {
            return (
                <div key={`fragment-${comment._id}`} className="relative">
                    <CommentCard comment={comment} key={comment._id} setNumComments={setComments} postId={postId} level={level} parentNumber={parentNumber} />
                    {comment.childIds && comment.childIds.map(childId => {
                        return renderComments(initialComments.filter(comment => comment._id === childId), level + 1, comment.userNumber);
                    })}
                    {level === 0 && <Separator className="bg-white dark:bg-neutral-700 " key={`separator-${comment._id}`} />}
                </div>
            );
        });
    }

    return (
        <>
            <PostCard post={post} isDedicatedPage={true} numComments={numComments}/>
            <CommentForm postId={postId} setNumComments={setComments}/>
            <Separator className="bg-white dark:bg-neutral-700 h-[1px] my-2" />
            {renderComments(topLevelComments, 0)}
        </>
    )
}

export default PostWithComments