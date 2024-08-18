'use server';

import { API_URL } from "@/utils/constants";
import { revalidatePath } from "next/cache";

interface createCommentParams {
    content: string;
    postId: string;
    userId: string;
    parentCommentId?: string;
}
const createComment = async ({ content, postId, userId, parentCommentId }: createCommentParams) => {

    let commentData = {
        parentCommentId: parentCommentId,
        userId,
        commentContent: content,
        upvotes: 0,
    };
    try {
        // dispatch({ type: "CREATE_START" });
        const response = await fetch(`${API_URL}/comments/createNewComment/${postId}/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentData)
        });

        if (!response.ok) {
            // dispatch({ type: "CREATE_ERROR", payload: 'Failed to submit post' });
            throw new Error('Failed to submit post');
        }
        // dispatch({ type: "CREATE_SUCCESS" });
        revalidatePath(`/post/${postId}`);
    } catch (error) {
        // dispatch({ type: "CREATE_ERROR", payload: 'Failed to submit post' });
    }
}

export default createComment;