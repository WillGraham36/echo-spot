"use server";

import { API_URL } from "@/utils/constants";
import exp from "constants";

type blockUserProps = {
    userId: string,
    blockedUserId: string,
};

const blockUser = async ({ userId, blockedUserId }: blockUserProps) => {
    const url = `${API_URL}/users/blockUser/${userId}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ blockedUserId }),
        });
        if (!response.ok) {
            console.error("Error blocking user", response);
            return;
        }

    } catch (error) {
        console.error("Error blocking user", error);
    }
}

export default blockUser;