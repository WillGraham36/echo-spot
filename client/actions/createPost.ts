"use server";

import { createPostData } from "@/types/createTypes";
import { API_URL } from "@/utils/constants";

type createPostProps = {
    postData: createPostData,
    userId: string,
    token: string | null;
}

const createPost = async ({
    postData,
    userId,
    token,
}: createPostProps) => {
    try {
        const response = await fetch(`${API_URL}/posts/createNewPost/${userId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            return ({
                type: 'CREATE_ERROR',
                payload: 'Failed to submit post'
            })
        };

        return ({
            type: 'CREATE_SUCCESS'
        });

    } catch (error) {
        return ({
            type: 'CREATE_ERROR',
            payload: 'Failed to submit post'
        });
    };
}

export default createPost