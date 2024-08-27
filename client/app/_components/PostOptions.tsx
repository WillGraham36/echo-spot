import IsCurrentUser from "@/components/IsCurrentUser";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CommentType } from "@/types/CommentType";
import { PostType } from "@/types/PostType";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs"
import { Ellipsis } from "lucide-react"
import deletePostOrComment from "@/actions/deletePostOrComment";

type PostOptionsProps =
    | { post: PostType; comment?: never }
    | { post?: never; comment: CommentType };

const PostOptions = ({ post, comment }: PostOptionsProps) => {

    const posterId = post?.userId || comment?.userId;

    const { user } = useUser();

    const handleButtonClick = (e: React.MouseEvent) => { e.preventDefault(); }

    const blockUser = (e: React.MouseEvent) => {
        e.preventDefault();  
    }

    const deletePost = (e: React.MouseEvent) => {
        e.preventDefault();

        deletePostOrComment({
            postType: post ? "post" : "comment",
            postId: (post?._id || comment?._id) as string,
            userId: (post?.userId || comment?.userId) as string,
        })
    }
    return (
        <>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger onClick={handleButtonClick} className="rounded-full p-1
                                dark:hover:bg-neutral-700 hover:bg-neutral-300">
                    <Ellipsis size={24} />
                </DropdownMenuTrigger>

                <SignedOut/>

                <SignedIn>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {user?.id === posterId ? (
                            <>
                                <DropdownMenuItem onClick={deletePost}>
                                    {post ? "Delete Post" : "Delete Comment"}
                                </DropdownMenuItem>
                            </>
                        ): (
                            <>
                                <DropdownMenuItem onClick={blockUser}>
                                    Block User
                                </DropdownMenuItem>
                            </>
                        )}
                    </DropdownMenuContent> 
                </SignedIn>

            </DropdownMenu>
        </>
    )
}

export default PostOptions