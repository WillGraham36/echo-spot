"use server";
type deletePostOrCommentProps = {
    postType: "post" | "comment",
    postId: string,
    userId: string,
};


const deletePostOrComment = ({ postType, postId, userId }: deletePostOrCommentProps) => {
    console.log("deletePostOrComment", postType, postId, userId);    
}

export default deletePostOrComment