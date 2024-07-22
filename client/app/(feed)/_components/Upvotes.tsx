import { cn } from '@/lib/utils';
import { API_URL } from '@/utils/constants';
import { useUser } from '@clerk/nextjs';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type likedStatus = "UPVOTED" | "DOWNVOTED" | "NONE";
type changeUpvote = "ADD" | "REMOVE";

interface UpvotesButtonsProps {
    upvotes: number,
    setUpvotes: Dispatch<SetStateAction<number>>,
    postId: string,
    usersWhoUpvoted: Array<string>,
    usersWhoDownvoted: Array<string>,
}

const UpvotesButtons = ({ 
    upvotes, 
    setUpvotes, 
    postId, 
    usersWhoUpvoted,
    usersWhoDownvoted
}: UpvotesButtonsProps) => {

    const { user, isLoaded, isSignedIn } = useUser();
    const router = useRouter();
    const [isUpvoted, setIsUpvoted] = useState<likedStatus>("NONE");

    useEffect(() => {
        if(isLoaded && isSignedIn) {
            const isLiked = usersWhoUpvoted.includes(user?.id as string) ? "UPVOTED" : usersWhoDownvoted.includes(user?.id as string) ? "DOWNVOTED" : "NONE";
            setIsUpvoted(isLiked);
        }
    },[isLoaded]);

    async function updateVotes(numUpvotes: number, change: changeUpvote, upOrDownvote: "UPVOTE" | "DOWNVOTE") {

        try {
            const response = await fetch(`${API_URL}/posts/byId/${postId}?addOrRemoveUpvote=${change}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    upvotes: numUpvotes,
                    usersWhoUpvoted: upOrDownvote === "UPVOTE" ? user?.id : null,
                    usersWhoDownvoted: upOrDownvote === "DOWNVOTE" ? user?.id : null
                })
            });
            if(!response.ok) {
                throw new Error("Failed to update votes");
            }
        } catch (error) {
            throw new Error("Failed to update votes");
        }
    }

    async function handleUpvote(e: React.MouseEvent) {
        e.preventDefault();
        const initialUpvotes = upvotes;
        let newUpvotes = upvotes;
        let change: changeUpvote = "ADD";

        if(isUpvoted === "UPVOTED") {
            setIsUpvoted("NONE");
            newUpvotes--;
            change = "REMOVE";
        } else {
            if (isUpvoted === "DOWNVOTED") {
                newUpvotes++;
            }
            setIsUpvoted("UPVOTED");
            newUpvotes++;
        }

        setUpvotes(newUpvotes);

        try {
            await updateVotes(newUpvotes, change, "UPVOTE");
        } catch (error) {
            setUpvotes(initialUpvotes);
            setIsUpvoted(isUpvoted === "UPVOTED" ? "UPVOTED" : "NONE");
        }
    }

    async function handleDownvote(e: React.MouseEvent) {
        e.preventDefault();
        const initialUpvotes = upvotes;
        let newUpvotes = upvotes;
        let change: changeUpvote = "ADD";

        if(isUpvoted === "DOWNVOTED") {
            setIsUpvoted("NONE");
            newUpvotes++;
            change = "REMOVE";
        } else {
            if (isUpvoted === "UPVOTED") {
                newUpvotes--;
            }
            setIsUpvoted("DOWNVOTED");
            newUpvotes--;
        }

        setUpvotes(newUpvotes);

        try {
            await updateVotes(newUpvotes, change, "DOWNVOTE");
        } catch (error) {
            setUpvotes(initialUpvotes);
            setIsUpvoted(isUpvoted === "DOWNVOTED" ? "DOWNVOTED" : "NONE");
        }
    }

    return (
        <span className='inline-flex items-center gap-x-2'>
            <div 
                className='hover:text-primary rounded-full transition-colors p-1 cursor-pointer'
                role='button'
                onClick={isSignedIn ? handleUpvote : () => router.push('/sign-in')}
            >
                <ArrowBigUp
                    size={30}
                    strokeWidth='1px'
                    className={cn(isUpvoted === "UPVOTED" && 'fill-primary text-primary')}
                />
            </div>
            <p className='font-bold w-5 text-center'>{upvotes}</p>
            <div
                className='hover:text-primary rounded-full transition-colors p-1 cursor-pointer'
                role='button'
                onClick={isSignedIn ? handleDownvote : () => router.push('/sign-in')}
            >
                <ArrowBigDown
                    size={30}
                    strokeWidth='1px'
                    className={cn(isUpvoted === "DOWNVOTED" && 'fill-primary text-primary')}
                />
            </div>
        </span>
    )
}

export default UpvotesButtons