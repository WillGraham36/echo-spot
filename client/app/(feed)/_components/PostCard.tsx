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
import { useToast } from "@/components/ui/use-toast"


interface PostProps {
    post: PostType,
    isDedicatedPage?: boolean
    numComments?: number
}

const PostCard = ({
    post: {
        _id,
        category,
        title,
        upvotes,
        comments,
        date
    },
    isDedicatedPage,
    numComments
}: PostProps) => {

    upvotes = upvotes ? upvotes : 0;
    const [numUpvotes, setNumUpvotes] = useState(upvotes);
    const { toast } = useToast();

    const handleButtonClick = (e: React.MouseEvent) => {
        e.preventDefault();
    }
    const handleShare = (e: React.MouseEvent) => {
        e.preventDefault();
        const postUrl = `${window.location.origin}/post/${_id}`;
        navigator.clipboard.writeText(postUrl);
        toast({
            description: "Post successfully copied to clipboard",
            duration: 3000,
            className: "bg-[#1F1F1F] text-white",
        })
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
                    <DropdownMenuTrigger onClick={handleButtonClick} className="rounded-full p-1
                        dark:hover:bg-neutral-700 hover:bg-neutral-300">
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
                    <UpvotesButtons
                        upvotes={numUpvotes}
                        setUpvotes={setNumUpvotes}
                        postId={_id}
                        upvoteType="posts"
                    />
                    <div
                        className='flex justify-center rounded-3xl p-[5px] px-3 cursor-pointer 
                            bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600'
                        role='button'
                    >
                        <MessageCircle size={23} strokeWidth='1px' />
                        <p className="font-bold min-w-5 text-center">
                            {numComments ? numComments : comments.length}
                        </p>
                    </div>
                    <div
                        className='flex justify-center rounded-3xl p-[5px] px-2 cursor-pointer 
                            bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600'
                        role='button'
                        onClick={handleShare}
                    >
                        <Forward size={23} strokeWidth='1px' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostCard