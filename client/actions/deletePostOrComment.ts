"use server";

import { API_URL } from "@/utils/constants";
import { revalidatePath } from "next/cache";

type deletePostOrCommentProps = {
    postType: "post" | "comment",
    postId: string,
    userId: string,
    token: string | null
};


const deletePostOrComment = async ({ postType, postId, userId, token }: deletePostOrCommentProps) => {
    const url = postType === "post" ? `${API_URL}/posts/deletePost/${postId}/${userId}` 
        : `${API_URL}/comments/deleteComment/${postId}/${userId}`;

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        if(!response.ok) {
            console.error("Error deleting post or comment", response);
            return;
        }

        if(postType === "comment") {
            revalidatePath(`/post/${postId}`);
            return;
        }
        revalidatePath(`/`);

    } catch (error) {
        console.error("Error deleting post or comment", error);
    }
}

export default deletePostOrComment