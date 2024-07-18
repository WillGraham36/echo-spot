import { cn } from '@/lib/utils';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react';

type likedStatus = "UPVOTED" | "DOWNVOTED" | "NONE";

interface UpvotesButtonsProps {
    upvotes: number,
    setUpvotes: Dispatch<SetStateAction<number>>
    postId: string
}

const UpvotesButtons = ({upvotes, setUpvotes, postId}: UpvotesButtonsProps) => {

    const [isUpvoted, setIsUpvoted] = useState<likedStatus>("NONE");

    async function updateVotes() {
        try {
            const response = await fetch(`http://localhost:8080/posts/byId/${postId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ upvotes: upvotes })
            });
            if (!response.ok) {
                throw new Error('Failed to update votes');
            }
        } catch (error) {
            throw new Error('Failed to update votes');
        }
    }

    async function handleUpvote() {
        const initialUpvotes = upvotes;
        if(isUpvoted === "UPVOTED") {
            setIsUpvoted("NONE");
            setUpvotes((prevUpvotes) => {return prevUpvotes - 1});
        } else {
            if (isUpvoted === "DOWNVOTED") {
                setUpvotes((prevUpvotes) => { return prevUpvotes + 1 });
            }
            setIsUpvoted("UPVOTED");
            setUpvotes((prevUpvotes) => { return prevUpvotes + 1 });
        }

        try {
            await updateVotes();
        } catch (error) {
            setUpvotes(initialUpvotes);
            setIsUpvoted(isUpvoted === "UPVOTED" ? "UPVOTED" : "NONE");
        }
    }

    async function handleDownvote() {
        const initialUpvotes = upvotes;
        if(isUpvoted === "DOWNVOTED") {
            setIsUpvoted("NONE");
            setUpvotes((prevUpvotes) => { return prevUpvotes + 1 });
        } else {
            if (isUpvoted === "UPVOTED") {
                setUpvotes((prevUpvotes) => { return prevUpvotes - 1 });
            }
            setIsUpvoted("DOWNVOTED");
            setUpvotes((prevUpvotes) => { return prevUpvotes - 1 });
        }

        try {
            await updateVotes();
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
                onClick={handleUpvote}
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
                onClick={handleDownvote}
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