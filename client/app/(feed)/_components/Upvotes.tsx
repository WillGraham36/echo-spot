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
        } else {
            setIsUpvoted("UPVOTED");
            setUpvotes((prevUpvotes) => { return prevUpvotes + 1 });
        }
    }
    function handleDownvote() {
        if(isUpvoted === "DOWNVOTED") {
            setIsUpvoted("NONE");
            setUpvotes((prevUpvotes) => { return prevUpvotes + 1 });
        } else {
            setIsUpvoted("DOWNVOTED");
            setUpvotes((prevUpvotes) => { return prevUpvotes - 1 });
        }
    }

    return (
        <span className='inline-flex items-center gap-x-2'>
            <Button 
                size={"postBtn"} 
                variant={"ghostHover"} 
                className={cn('rounded-full',
                    isUpvoted === "UPVOTED" && 'bg-primary' 
                )}
                onClick={handleUpvote}
            >
                <ArrowBigUp
                    size={30}
                    strokeWidth='1px'
                    className={cn(isUpvoted === "UPVOTED" && 'fill-white')}
                />
            </Button>
            <p className='font-bold'>{upvotes}</p>
            <Button 
                size={"postBtn"} 
                variant={"ghostHover"} 
                className={cn('rounded-full',
                    isUpvoted === "DOWNVOTED" && 'bg-primary'
                )}
                onClick={handleDownvote}
            >
                <ArrowBigDown
                    size={30}
                    strokeWidth='1px'
                    className={cn(isUpvoted === "DOWNVOTED" && 'fill-white')}
                />
            </Button>
        </span>
    )
}

export default UpvotesButtons