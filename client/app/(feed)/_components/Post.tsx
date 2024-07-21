import Image from "next/image"
import { Bookmark, Ellipsis, Forward, MessageCircle } from "lucide-react"
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

interface Comment {
    commentId: string,
    parentId?: number | undefined,
    level?: number | undefined,
    userId: number,
    date: Date
    userNumber: number,
    commentContent: string,
    upvotes: number,
}

interface PostProps {
    postId: string,
    userId: string,
    date: Date
    category: string,
    title: string,
    upvotes: number,
    usersWhoUpvoted: Array<string>,
    usersWhoDownvoted: Array<string>,
    comments?: Array<Comment>,
}



const Post = ({
    postId,
    userId,
    date,
    category,
    title,
    upvotes,
    usersWhoUpvoted,
    usersWhoDownvoted,
    comments
}: PostProps) => {

    upvotes = upvotes ? upvotes : 0;
    const [numUpvotes, setNumUpvotes] = useState(upvotes);

    return (    
        <div className="w-full md:w-[70%] md:bg-neutral-100 md:dark:bg-neutral-800 md:rounded-xl md:p-4 px-4 pt-1 pb-3 border-b md:border-y-0 border-y-muted-foreground">
            <div className="flex justify-between items-center">
                <span className=" inline-flex items-center gap-x-2">
                    <Image
                        src="/logo.png"
                        alt="EchoSpot Logo"
                        width={40}
                        height={40}
                        className="hidden md:block dark:bg-primary rounded-xl"
                    />
                    <h3 className="font-bold">
                        {category}
                    </h3>
                    <h2 className="text-muted-foreground text-sm">
                        {CalculteTimeDiff({compToDate: new Date(date)})}
                    </h2>
                </span>
                <DropdownMenu>
                    <DropdownMenuTrigger>
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


            <div className="text-start pt-2 md:pl-12">
                <h1>
                    {title}
                </h1>
            </div>

            <div className="flex md:pl-12 pt-3 justify-between">
                <div className="flex items-center gap-x-2">
                    <Button size={"postBtn"} variant={"ghostHover"}>
                        <MessageCircle size={26} />
                        {comments && 
                            <p className="font-medium px-2">
                                {comments.length}
                            </p>
                        }
                    </Button>
                    <Button size={"postBtn"} variant={"ghostHover"}>
                        <Bookmark size={26} />
                    </Button>
                    <Button size={"postBtn"} variant={"ghostHover"}>
                        <Forward size={26} />
                    </Button>
                    
                    
                </div>
                    <UpvotesButtons 
                        upvotes={numUpvotes} 
                        setUpvotes={setNumUpvotes}
                        postId={postId}
                        usersWhoUpvoted={usersWhoUpvoted}
                        usersWhoDownvoted={usersWhoDownvoted}
                    />  
            </div>
        </div>
    )
}

export default Post