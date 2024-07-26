
import { getPost } from "@/actions/getPosts"
import PostCard from "../../_components/PostCard";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SubmitCommentForm from "../../_components/SubmitCommentForm";
import { Separator } from "@/components/ui/separator";
import { getComments } from "@/actions/getComments";
import CommentCard from "../../_components/CommentCard";
import { CommentType } from "@/types/CommentType";

const PostPage = async ({ params }: { params: { postId: string } }) => {

    const postId = params.postId
    const post = await getPost(postId);
    let comments = null;
    if(post.numComments > 0) {
        comments = await getComments(postId);
    }


    return (
        <div className="w-full flex flex-col items-center gap-y-4 pt-8">
            <div className="w-full md:w-[70%] md:bg-neutral-100 md:dark:bg-neutral-800 md:rounded-xl md:p-4 px-4 pb-3 border-b md:border-y-0 
            border-y-muted-foreground pt-1 flex">
                <Link href="/">
                    <Button 
                        className="hidden rounded-full mt-[9px] mr-1 sm:flex items-center justify-center" 
                        size={"icon"} 
                        variant={"ghostHover"}
                    >
                        <ArrowLeft />
                    </Button>
                </Link>
                <div className="w-full">
                    <PostCard post={post} isDedicatedPage={true}/>
                    <SubmitCommentForm postId={postId} />
                    {comments && comments.map((comment: CommentType) => {
                        return (
                            <>
                                <CommentCard comment={comment} key={comment._id} />
                                <Separator className="dark:bg-muted-foreground" />
                            </>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default PostPage