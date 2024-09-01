"use server";

import { API_URL } from "@/utils/constants";
import { revalidatePath } from "next/cache";
import { usePathname } from "next/navigation";

type deletePostOrCommentProps = {
    postType: "post" | "comment",
    postId: string,
    userId: string,
};


const deletePostOrComment = async ({ postType, postId, userId }: deletePostOrCommentProps) => {
    const url = postType === "post" ? `${API_URL}/posts/deletePost/${postId}/${userId}` 
        : `${API_URL}/comments/deleteComment/${postId}/${userId}`;

    try {
        const response = await fetch(url, {
            method: "DELETE",
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