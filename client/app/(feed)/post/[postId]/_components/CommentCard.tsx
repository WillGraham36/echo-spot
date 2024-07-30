"use client";
import { CommentType } from "@/types/CommentType"
import CalculteTimeDiff from "@/utils/CalculteTimeDiff"
import { Ellipsis, User } from "lucide-react"
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

interface CommentCardProps {
    comment: CommentType
}

const CommentCard = ({
    comment
}: CommentCardProps) => {

    const [numUpvotes, setNumUpvotes] = useState(comment.upvotes);

    return (
        <div className="w-full py-1 my-2 flex gap-x-4">
            <div>
                <User size={24} className="bg-red-600 rounded-full size-6 mt-[3px]"/>
            </div>
            <div className="w-full flex-col pr-2">
                <div className="flex justify-between">
                    <span className="inline-flex items-center gap-x-2">
                        <h1 className="font-medium">#{comment.userNumber}</h1>
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
                <div className="flex items-center justify-end">
                    {/* TODO: Be able to reply to user comments, for now im not bothering */}
                    <UpvotesButtons
                        upvotes={numUpvotes}
                        setUpvotes={setNumUpvotes}
                        postId={comment._id}
                        usersWhoUpvoted={comment.usersWhoUpvoted}
                        usersWhoDownvoted={comment.usersWhoDownvoted}
                    />
                </div>
            </div>
        </div>
    )
}

export default CommentCard