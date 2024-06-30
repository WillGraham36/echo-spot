import Image from "next/image"
import { Bookmark, Ellipsis, Forward, MessageCircle } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LikesButtons from "./Likes"
import { Button } from "@/components/ui/button"

interface Comment {
    id: string,
    parentId?: number | undefined,
    level?: number | undefined,
    userId: number,
    location: Location,
    date: Date
    userNumber: number,
    commentContent: string,
    upvotes: number,
}

interface PostProps {
    postId: string,
    userId: number,
    location: Location,
    date: Date
    category?: string,
    title: string,
    upvotes: number,
    comments?: Array<Comment>,
}



const Post = () => {
    return (    
        <div className="w-full md:w-[70%] md:bg-neutral-100 md:dark:bg-neutral-800 md:rounded-xl md:p-4 px-4 pt-1 pb-3 border-b md:border-y-0 border-y-muted-foreground">
            <div className="flex justify-between items-center">
                <span className=" inline-flex items-center gap-x-2">
                    <Image
                        src="/logo.png"
                        alt="Placeholder"
                        width={40}
                        height={40}
                        className="hidden md:block dark:bg-primary rounded-xl"
                    />
                    <h3 className="font-bold">
                        Category
                    </h3>
                    <h2 className="text-muted-foreground text-sm">
                        17h
                    </h2>
                </span>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Ellipsis size={24} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem>
                            Block User
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>


            <div className="text-start pt-2 md:pl-12">
                <h1>
                    Title Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus unde quae amet eius excepturi aliquam quas distinctio autem ab quo, voluptates dignissimos ipsam harum, blanditiis consequuntur provident. Sed, deserunt obcaecati.
                </h1>
            </div>

            <div className="flex md:pl-12 pt-3 justify-between">
                <div className="flex items-center gap-x-2">
                    <Button size={"postBtn"} variant={"ghostHover"}>
                        <MessageCircle size={26} />
                        <p className="font-medium px-2">
                            30
                        </p>
                    </Button>
                    <Button size={"postBtn"} variant={"ghostHover"}>
                        <Bookmark size={26} />
                    </Button>
                    <Button size={"postBtn"} variant={"ghostHover"}>
                        <Forward size={26} />
                    </Button>
                    
                    
                </div>
                    <LikesButtons likes={30}/>  
            </div>
        </div>
    )
}

export default Post