import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react'
import { useState } from 'react'

type likedStatus = "LIKED" | "DISLIKED" | "NONE";



const LikesButtons = ({likes}: {likes: number}) => {

    const [isLiked, setIsLiked] = useState<likedStatus>("NONE");

    function handleUpvote() {
        if(isLiked === "LIKED") {
            setIsLiked("NONE");
        } else {
            setIsLiked("LIKED");
        }
    }
    function handleDownvote() {
        if(isLiked === "DISLIKED") {
            setIsLiked("NONE");
        } else {
            setIsLiked("DISLIKED");
        }
    }

    return (
        <span className='inline-flex items-center gap-x-2'>
            <Button 
                size={"postBtn"} 
                variant={"ghostHover"} 
                className={cn('rounded-full',
                    isLiked === "LIKED" && 'bg-primary' 
                )}
                onClick={handleUpvote}
            >
                <ArrowBigUp
                    size={30}
                    strokeWidth='1px'
                />
            </Button>
            <p className='font-bold'>{likes}</p>
            <Button 
                size={"postBtn"} 
                variant={"ghostHover"} 
                className={cn('rounded-full',
                    isLiked === "DISLIKED" && 'bg-primary'
                )}
                onClick={handleDownvote}
            >
                <ArrowBigDown
                    size={30}
                    strokeWidth='1px'
                />
            </Button>
        </span>
    )
}

export default LikesButtons