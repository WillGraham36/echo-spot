import { CommentType } from "@/types/CommentType"
import CommentCard from "./CommentCard";
import { Separator } from "@radix-ui/react-dropdown-menu";
import CommentForm from "./CommentForm";

interface CommentListProps {
    postId: string,
    initialComments: CommentType[] | null
}

const CommentList = ({ postId, initialComments }: CommentListProps) => {
    return (
        <>
            <CommentForm postId={postId} />
            {initialComments && initialComments.map((comment: CommentType) => {
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