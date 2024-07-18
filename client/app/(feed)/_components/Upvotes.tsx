import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react';

type likedStatus = "UPVOTED" | "DOWNVOTED" | "NONE";

interface UpvotesButtonsProps {
    upvotes: number,
    setUpvotes: Dispatch<SetStateAction<number>>
}

const UpvotesButtons = ({upvotes, setUpvotes}: UpvotesButtonsProps) => {

    const [isUpvoted, setIsUpvoted] = useState<likedStatus>("NONE");

    function handleUpvote() {
        if(isUpvoted === "UPVOTED") {
            setIsUpvoted("NONE");
            setUpvotes((prevUpvotes) => {return prevUpvotes - 1});
            return;
        } 
        if(isUpvoted === "DOWNVOTED") {
            setUpvotes((prevUpvotes) => { return prevUpvotes + 1 });
        }
        setIsUpvoted("UPVOTED");
        setUpvotes((prevUpvotes) => { return prevUpvotes + 1 });
    }
    function handleDownvote() {
        if(isUpvoted === "DOWNVOTED") {
            setIsUpvoted("NONE");
            setUpvotes((prevUpvotes) => { return prevUpvotes + 1 });
            return;
        }
        if(isUpvoted === "UPVOTED") {
            setUpvotes((prevUpvotes) => { return prevUpvotes - 1 });
        }
        setIsUpvoted("DOWNVOTED");
        setUpvotes((prevUpvotes) => { return prevUpvotes - 1 });
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