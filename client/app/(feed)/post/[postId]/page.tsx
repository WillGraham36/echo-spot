import { getPost } from "@/actions/getPosts"
import PostCard from "../../_components/PostCard";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const PostPage = async ({ params }: { params: { postId: string } }) => {

    const postId = params.postId
    const post = await getPost(postId);
    console.log(post)

    return (
        <div className="w-full flex flex-col items-center gap-y-4 pt-8">
            <div className="w-full md:w-[70%] md:bg-neutral-100 md:dark:bg-neutral-800 md:rounded-xl md:p-4 px-4 pb-3 border-b md:border-y-0 
            border-y-muted-foreground pt-1 flex">
                <Button className="hidden sm:block rounded-full mt-7" size={"sm"} variant={"ghostHover"} >
                    <ArrowLeft />
                </Button>
                <div className="w-full">
                    <PostCard post={post} isFeedPost={false}/>
                </div>
            </div>
        </div>
    )
}

export default PostPage