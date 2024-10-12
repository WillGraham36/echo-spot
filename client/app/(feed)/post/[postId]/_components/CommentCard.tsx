"use client";
import { CommentType } from "@/types/CommentType"
import CalculteTimeDiff from "@/utils/CalculteTimeDiff"
import { ChevronRight, Ellipsis, MessageCircle, User } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UpvotesButtons from "@/app/(feed)/_components/Upvotes"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CommentForm from "./CommentForm";
import { Separator } from "@/components/ui/separator";
import PostOptions from "@/app/_components/PostOptions";

const generateColor = (num: number) => {
    const colors = ["#e11d48", "#FF6347", "#FF4500", "#FF69B4", "#FF1493", "#FF00FF", "#FF00FF", "#FFB6C1", "#FFC3A0"];
    return colors[num % colors.length];
}

interface CommentCardProps {
    comment: CommentType,
    setNumComments: React.Dispatch<React.SetStateAction<number>>
    postId: string,
    level: number,
    parentNumber?: number
}

const CommentCard = ({
    comment,
    setNumComments,
    postId,
    level,
    parentNumber,
}: CommentCardProps) => {

    const [numUpvotes, setNumUpvotes] = useState(comment.upvotes);
    const [replyIsOpen, setReplyIsOpen] = useState(false);

    const handleReplying = () => {
        setReplyIsOpen(!replyIsOpen);
    }

    // Calculate padding left based on the level
    const paddingLeft = `${level * 50}px`;

    return (
        <div className="w-full py-1 my-2 flex gap-x-2" style={{ paddingLeft }}>
            <div className="flex justify-center">
                <User size={22} className="rounded-full p-[1px] mt-[5px] z-20" style={{backgroundColor: generateColor(comment.userNumber)}}/>
                {comment.childIds && comment.childIds.length > 0 && 
                    <Separator orientation="vertical" className="absolute top-5 h-[calc(100%-30px)] bg-white dark:bg-neutral-700" />
                }
            </div>
            <div className="w-full flex-col pr-2">
                <div className="flex justify-between">
                    <span className="inline-flex items-center gap-x-1">
                        <p>
                            {comment.userNumber === 0 ? "OP": `#${comment.userNumber}`}
                        </p>
                        {parentNumber !== undefined && 
                            <>
                                <ChevronRight size={15} className="text-muted-foreground"/>
                                <p>{parentNumber === 0 ? "OP" : `#${parentNumber}`}</p>
                            </>
                        }
                        <p className="text-muted-foreground text-sm">
                            &middot; {CalculteTimeDiff({ compToDate: new Date(comment.date) })}
                        </p>
                    </span>
                    <PostOptions comment={comment} />
                </div>
                <h1 className="py-0.5">{comment.commentContent}</h1>
                <div className="flex items-center gap-x-1">
                    <UpvotesButtons
                        upvotes={numUpvotes}
                        setUpvotes={setNumUpvotes}
                        postId={comment._id}
                        upvoteType="comments"
                    />
                    <div
                        className='flex justify-center items-center rounded-3xl p-[5px] px-1.5 cursor-pointer 
                        bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700'
                        onClick={handleReplying}
                    >
                        <MessageCircle size={23} strokeWidth='1px' />
                        <p className="text-xs pt-1 pl-0.5">Reply</p>
                    </div>
                </div>
                {replyIsOpen && <CommentForm postId={postId} setNumComments={setNumComments} parentCommentId={comment._id} setReplyIsOpen={setReplyIsOpen} />}
            </div>
        </div>
    )
}

export default CommentCard