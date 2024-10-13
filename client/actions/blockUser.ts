"use server";
import { API_URL } from "@/utils/constants";

type blockUserProps = {
    userId: string,
    blockedUserId: string,
    token: string | null,
};

const blockUser = async ({ userId, blockedUserId, token }: blockUserProps) => {
    const url = `${API_URL}/users/blockUser/${userId}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
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