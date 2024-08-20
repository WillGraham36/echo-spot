"use client";
import Image from "next/image"
import { Forward, MessageCircle } from "lucide-react"
import CalculteTimeDiff from "@/utils/CalculteTimeDiff"
import { useState } from "react"
import UpvotesButtons from "./Upvotes"
import { PostType } from "@/types/PostType"
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast"
import PostOptions from "@/app/_components/PostOptions";


interface PostProps {
    post: PostType,
    isDedicatedPage?: boolean
    numComments?: number
}

const PostCard = ({
    post,
    isDedicatedPage,
    numComments
}: PostProps) => {

    post.upvotes = post.upvotes ? post.upvotes : 0;
    const [numUpvotes, setNumUpvotes] = useState(post.upvotes);
    const { toast } = useToast();


    const handleShare = (e: React.MouseEvent) => {
        e.preventDefault();
        const postUrl = `${window.location.origin}/post/${post._id}`;
        navigator.clipboard.writeText(postUrl);
        toast({
            description: "Post successfully copied to clipboard",
            duration: 3000,
            className: "bg-[#1F1F1F] text-white",
        })
    }

    return (
        <div className="pl-2">
            <div className="flex justify-between items-center py-3">
                <span className="inline-flex items-center gap-x-2">
                    <Image
                        src="/logo.png"
                        alt="EchoSpot Logo"
                        width={30}
                        height={30}
                        className="hidden md:block dark:bg-primary rounded-xl p-[2px]"
                    />
                    <h3 className="font-bold">
                        {post.category}
                    </h3>
                    <h2 className="text-muted-foreground text-sm">
                        {CalculteTimeDiff({ compToDate: new Date(post.date) })}
                    </h2>
                </span>
                <PostOptions post={post} />
            </div>


            <h1 className={cn("text-start", isDedicatedPage && "pl-[2px]")}>
                {post.title}
            </h1>

            <div className="flex items-center gap-x-2 pt-4">
                <UpvotesButtons
                    upvotes={numUpvotes}
                    setUpvotes={setNumUpvotes}
                    postId={post._id}
                    upvoteType="posts"
                />
                <div
                    className='flex justify-center rounded-3xl p-[5px] px-3 cursor-pointer 
                        bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700'
                    role='button'
                >
                    <MessageCircle size={23} strokeWidth='1px' />
                    <p className="font-bold min-w-5 text-center">
                        {numComments ? numComments : post.comments.length}
                    </p>
                </div>
                <div
                    className='flex justify-center rounded-3xl p-[5px] px-2 cursor-pointer 
                        bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700'
                    role='button'
                    onClick={handleShare}
                >
                    <Forward size={23} strokeWidth='1px' />
                </div>
            </div>
        </div>
    )
}

export default PostCard