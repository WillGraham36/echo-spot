"use client";
import Image from "next/image"
import { Ellipsis, Forward, MessageCircle } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import CalculteTimeDiff from "@/utils/CalculteTimeDiff"
import { useState } from "react"
import UpvotesButtons from "./Upvotes"
import { PostType } from "@/types/PostType"
import { cn } from "@/lib/utils";

interface PostProps {
    post: PostType,
    isDedicatedPage?: boolean
    comments?: number
}

const PostCard = ({
    post: {
        _id,
        category,
        title,
        upvotes,
        usersWhoUpvoted,
        usersWhoDownvoted,
        numComments,
        date
    },
    isDedicatedPage,
    comments
}: PostProps) => {

    upvotes = upvotes ? upvotes : 0;
    const [numUpvotes, setNumUpvotes] = useState(upvotes);

    const handleButtonClick = (e: React.MouseEvent) => {
        e.preventDefault();
    }

    return (
        <div className="">
            <div className="flex justify-between items-center py-3">
                <span className="inline-flex items-center gap-x-2">
                    <Image
                        src="/logo.png"
                        alt="EchoSpot Logo"
                        width={35}
                        height={35}
                        className="hidden md:block dark:bg-primary rounded-xl"
                    />
                    <h3 className="font-bold">
                        {category}
                    </h3>
                    <h2 className="text-muted-foreground text-sm">
                        {CalculteTimeDiff({ compToDate: new Date(date) })}
                    </h2>
                </span>
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger onClick={handleButtonClick} className="dark:hover:bg-muted-foreground dark:hover:text-muted hover:bg-card rounded-full p-1">
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


            <div className={cn("text-start pt-2", isDedicatedPage ? "md:pl-[3px]" : "md:pl-12")}>
                <h1>
                    {title}
                </h1>
            </div>

            <div className={cn("flex justify-between pt-3",isDedicatedPage ? "md:pl-1" : "md:pl-12")}>
                <div className="flex items-center gap-x-2">
                    <Button size={"postBtn"} variant={"ghostHover"}>
                        <MessageCircle size={26} />
                        <p className="font-medium px-2">
                            {comments ? comments : numComments}
                        </p>
                    </Button>
                    <Button size={"postBtn"} variant={"ghostHover"} onClick={handleButtonClick}>
                        <Forward size={26} />
                    </Button>


                </div>
                <UpvotesButtons
                    upvotes={numUpvotes}
                    setUpvotes={setNumUpvotes}
                    postId={_id}
                    usersWhoUpvoted={usersWhoUpvoted}
                    usersWhoDownvoted={usersWhoDownvoted}
                    postType="posts"
                />
            </div>
        </div>
    )
}

export default PostCard