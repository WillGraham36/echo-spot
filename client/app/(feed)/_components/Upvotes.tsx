import getMongoUser from '@/actions/getMongoUser';
import { cn } from '@/lib/utils';
import { API_URL } from '@/utils/constants';
import { useUser } from '@clerk/nextjs';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react'
import { SetStateAction, useEffect, useState } from 'react';

type likedStatus = "UPVOTED" | "DOWNVOTED" | "NONE";

interface UpvotesButtonsProps {
    upvotes: number,
    setUpvotes: React.Dispatch<SetStateAction<number>>,
    postId: string,
    upvoteType: "posts" | "comments",
}

const UpvotesButtons = ({ 
    upvotes, 
    setUpvotes, 
    postId, 
    upvoteType,
}: UpvotesButtonsProps) => {

    const { user, isLoaded, isSignedIn } = useUser();
    const [isUpvoted, setIsUpvoted] = useState<likedStatus>("NONE");

    useEffect(() => {
        const checkIfUpvoted = async () => {
            if (isLoaded && isSignedIn) {
                const mongoUser = await getMongoUser(user?.id);
                const userVotedOnPost = mongoUser.votedPosts.find((vote: any) => vote.Id === postId);
                const userVotedOnComment = mongoUser.votedComments.find((vote: any) => vote.Id === postId);
                if (userVotedOnPost) {
                    setIsUpvoted(userVotedOnPost.vote === "UPVOTE" ? "UPVOTED" : "DOWNVOTED");
                }
                if (userVotedOnComment) {
                    setIsUpvoted(userVotedOnComment.vote === "UPVOTE" ? "UPVOTED" : "DOWNVOTED");
                }
            }
        }
        checkIfUpvoted();
    },[isLoaded]);

    async function updateVotes(voteType: "UPVOTE" | "DOWNVOTE") {
        try {
            const response = await fetch(`${API_URL}/${upvoteType}/vote/${postId}/${user?.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    voteType: voteType
                })
            });
            if(!response.ok) {
                throw new Error("Failed to update votes");
            }
            const data = await response.json();
            return data.upvotes;
        } catch (error) {
            throw new Error("Failed to update votes");
        }
    }

    async function handleUpvote(e: React.MouseEvent) {
        e.preventDefault();
        if(!isSignedIn) {
            // router.push('/sign-in')
            return;
        }
        if(isUpvoted === "UPVOTED") {
            setIsUpvoted("NONE");
        } else {
            setIsUpvoted("UPVOTED");
        }

        try {
            const newUpvotes = await updateVotes("UPVOTE");
            setUpvotes(newUpvotes);
        } catch (error) {
            setIsUpvoted(isUpvoted === "UPVOTED" ? "UPVOTED" : "NONE");
        }
    }

    async function handleDownvote(e: React.MouseEvent) {
        e.preventDefault();
        if (!isSignedIn) {
            // router.push('/sign-in')
            return;
        }

        if(isUpvoted === "DOWNVOTED") {
            setIsUpvoted("NONE");
        } else {
            setIsUpvoted("DOWNVOTED");
        }
        
        try {
            const newUpvotes = await updateVotes("DOWNVOTE");
            setUpvotes(newUpvotes);
        } catch (error) {
            setIsUpvoted(isUpvoted === "DOWNVOTED" ? "DOWNVOTED" : "NONE");
        }
    }

    return (
        <span className='inline-flex items-center gap-x-1 rounded-3xl 
            bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600'
        >
            <div 
                className='rounded-full transition-colors p-1 cursor-pointer hover:text-primary hover:bg-neutral-200 dark:hover:bg-neutral-500'
                role='button'
                onClick={handleUpvote}
            >
                <ArrowBigUp
                    size={25}
                    strokeWidth='1px'
                    className={cn(isUpvoted === "UPVOTED" && 'fill-primary text-primary')}
                />
            </div>
            <p className='font-bold min-w-5 text-center'>{upvotes}</p>
            <div
                className='rounded-full transition-colors p-1 cursor-pointer hover:text-primary hover:bg-neutral-200 dark:hover:bg-neutral-500'
                role='button'
                onClick={handleDownvote}
            >
                <ArrowBigDown
                    size={25}
                    strokeWidth='1px'
                    className={cn(isUpvoted === "DOWNVOTED" && 'fill-primary text-primary')}
                />
            </div>
        </span>
    )
}

export default UpvotesButtons