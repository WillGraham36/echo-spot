'use server';

import { API_URL } from "@/utils/constants";
import { revalidatePath } from "next/cache";

interface addCommentParams {
    content: string;
    postId: string;
    userId?: string;
}
const addComment = async ({ content, postId, userId}: addCommentParams) => {

    const commentData = {
        parentPostId: postId,
        userId: userId,
        commentContent: content,
        upvotes: 1,
        usersWhoUpvoted: [userId]
    };
    try {
        // dispatch({ type: "CREATE_START" });
        const response = await fetch(`${API_URL}/comments`, {
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

export default addComment;