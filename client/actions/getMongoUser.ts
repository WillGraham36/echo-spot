"use server";
import { UserType } from "@/types/UserType";
import { API_URL } from "@/utils/constants";

export default async function getMongoUser(userId: string) {
    try {
        const response = await fetch(`${API_URL}/users/byId/${userId}`);
        const data = (await response.json());
        if(!response.ok) {
            throw new Error("Failed to fetch user");
        }
        return data;
    } catch (error) {
        throw new Error("Failed to fetch user");
    }
};