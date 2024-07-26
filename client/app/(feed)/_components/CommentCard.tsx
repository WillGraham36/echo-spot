import { CommentType } from "@/types/CommentType"

interface CommentCardProps {
    comment: CommentType
}

const CommentCard = ({
    comment
}: CommentCardProps) => {
    return (
        <div className="w-full py-2 my-2">
            {comment.commentContent}
        </div>
    )
}

export default CommentCard