"use server";
import { CommentType } from "@/types/CommentType";
import { API_URL } from "@/utils/constants";


export const getComments = async (postId: string): Promise<CommentType[]> => {
    const url = `${API_URL}/comments/forPost/${postId}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch comments");
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch comments");
    }
}