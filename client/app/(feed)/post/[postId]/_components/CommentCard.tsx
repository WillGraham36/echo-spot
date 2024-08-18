"use client";
import { CommentType } from "@/types/CommentType"
import CalculteTimeDiff from "@/utils/CalculteTimeDiff"
import { CornerDownRight, Ellipsis, User } from "lucide-react"
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

interface CommentCardProps {
    comment: CommentType,
    setNumComments: React.Dispatch<React.SetStateAction<number>>
    postId: string,
    level: number,
}

const CommentCard = ({
    comment,
    setNumComments,
    postId,
    level,
}: CommentCardProps) => {

    const [numUpvotes, setNumUpvotes] = useState(comment.upvotes);
    const [replyIsOpen, setReplyIsOpen] = useState(false);

    const handleReplying = () => {
        setReplyIsOpen(!replyIsOpen);
    }

    // Calculate padding left based on the level
    const paddingLeft = `${level * 80}px`;

    return (
        <div className="w-full py-1 my-2 flex gap-x-2" style={{ paddingLeft }}>
            <div>
                <User size={22} className="rounded-full mt-[5px] dark:bg-primary"/>
            </div>
            <div className="w-full flex-col pr-2">
                <div className="flex justify-between">
                    <span className="inline-flex items-center gap-x-2">
                        <h1 className="font-medium">
                            {comment.userNumber === 0 ? "OP": `#${comment.userNumber}`}
                        </h1>
                        <h2 className="text-muted-foreground text-sm">
                            {CalculteTimeDiff({ compToDate: new Date(comment.date) })}
                        </h2>
                    </span>
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger className="dark:hover:bg-muted-foreground dark:hover:text-muted hover:bg-card rounded-full p-1">
                            <Ellipsis size={24} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Options</DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <DropdownMenuItem>
                                {/* TODO: Add block user feature */}
                                Block User
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <h1 className="pt-1">{comment.commentContent}</h1>
                <div className="flex items-center justify-between">
                    <Button
                        variant={"ghostHover"}
                        className="ml-2 px-1 h-8 py-0 rounded-md"
                        onClick={handleReplying}
                    >
                        <CornerDownRight size={22} />
                    </Button>
                    <UpvotesButtons
                        upvotes={numUpvotes}
                        setUpvotes={setNumUpvotes}
                        postId={comment._id}
                        upvoteType="comments"
                    />
                </div>
                {replyIsOpen && <CommentForm postId={postId} setNumComments={setNumComments} parentCommentId={comment._id} />}
            </div>
        </div>
    )
}

export default CommentCard