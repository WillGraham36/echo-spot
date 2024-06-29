import { Button } from '@/components/ui/button'
import { ArrowBigDown, ArrowBigUp } from 'lucide-react'
import React from 'react'

const LikesButtons = ({likes}: {likes: number}) => {
    return (
        <span className='inline-flex items-center gap-x-2'>
            <Button size={"postBtn"} variant={"ghostHover"} className='rounded-full'>
                <ArrowBigUp
                    size={30}
                    strokeWidth='1px'
                />
            </Button>
            <p className='font-bold'>{likes}</p>
            <Button size={"postBtn"} variant={"ghostHover"} className='rounded-full'>
                <ArrowBigDown
                    size={30}
                    strokeWidth='1px'
                />
            </Button>
        </span>
    )
}

export default LikesButtons