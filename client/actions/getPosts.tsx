"use server";
import { PostType } from "@/types/PostType";
import { API_URL } from "@/utils/constants";

interface getPostProps {
    viewRadius: number,
    offset: number,
    location: {
        lat: number,
        long: number
    },
    limit: number
}

export const getPosts = async ({
    viewRadius,
    offset,
    location,
    limit
}: getPostProps): Promise<PostType[]> => {

    const url = `${API_URL}/posts/feed?lat=${location.lat}&long=${location.long}&maxDistance=${viewRadius * 1609}&limit=${limit}&offset=${offset}`
    try {
        const response = await fetch(url);
        const data = (await response.json()) as PostType[];
        if(!response.ok) {
            throw new Error("Failed to fetch posts");
        }
        return data;
    } catch (error) {
        throw new Error("Failed to fetch posts");
    }
}