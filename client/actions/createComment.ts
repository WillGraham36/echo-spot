'use server';

import { API_URL } from "@/utils/constants";
import { revalidatePath } from "next/cache";

interface createCommentParams {
    content: string;
    postId: string;
    userId: string;
    parentCommentId?: string;
    token: string | null;
}
const createComment = async ({ content, postId, userId, parentCommentId, token}: createCommentParams) => {
    let commentData = {
        parentCommentId,
        userId,
        commentContent: content,
        upvotes: 0,
    };
    try {
        const response = await fetch(`${API_URL}/comments/createNewComment/${postId}/${userId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentData)
        });
        if (!response.ok) {
            return ({
                type: 'CREATE_ERROR',
                payload: 'Failed to submit comment'
            })
        }
        revalidatePath(`/post/${postId}`);
        return ({
            type: 'CREATE_SUCCESS'
        });
    } catch (error) {
        return ({
            type: 'CREATE_ERROR',
            payload: 'Failed to submit post'
        });
    }
}

export default createComment;