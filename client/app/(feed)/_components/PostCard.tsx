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
import Link from "next/link"
import { PostType } from "@/types/PostType"

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
    post: PostType
}

const PostCard = ({
    post: {
        _id,
        category,
        title,
        upvotes,
        usersWhoUpvoted,
        usersWhoDownvoted,
        comments,
        date
    }
}: PostProps) => {

    upvotes = upvotes ? upvotes : 0;
    const [numUpvotes, setNumUpvotes] = useState(upvotes);

    const handleButtonClick = (e: React.MouseEvent) => {
        e.preventDefault();
    }

    return (
        <Link href={`post/${_id}`} className="w-full md:w-[70%] md:bg-neutral-100 md:dark:bg-neutral-800 md:rounded-xl md:p-4 px-4 pb-3 border-b md:border-y-0 border-y-muted-foreground pt-1">
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
                            {CalculteTimeDiff({ compToDate: new Date(date) })}
                        </h2>
                    </span>
                    <DropdownMenu>
                        <DropdownMenuTrigger onClick={handleButtonClick}>
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
                            <p className="font-medium px-2">
                                {comments ? comments.length : 0}
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
                    />
                </div>
        </Link>
    )
}

export default PostCard