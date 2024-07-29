import { CommentType } from "@/types/CommentType"
import CommentCard from "./CommentCard";
import { Separator } from "@radix-ui/react-dropdown-menu";
import CommentForm from "./CommentForm";
import { getComments } from "@/actions/getComments";

interface CommentListProps {
    postId: string,
}

const CommentList = async ({ postId }: CommentListProps) => {

    const comments = await getComments(postId);

    return (
        <>
            <CommentForm postId={postId}/>
            {comments && comments.map((comment: CommentType) => {
                return (
                    <>
                        <CommentCard comment={comment} key={comment._id} />
                        <Separator className="dark:bg-muted-foreground h-[1px]" key={`separator-${comment._id}`} />
                    </>
                );
            })}
        </>
    )
}

export default CommentList