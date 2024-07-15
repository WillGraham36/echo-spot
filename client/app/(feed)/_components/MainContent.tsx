"use client";
import { useEffect, useState } from "react"
import Post from "./Post"
import useLocation from "@/hooks/useLocation"
import LocationRange from "./LocationRange";
import { Spinner } from "@/components/ui/spinner";

const limit = 100;
const offset = 0;


const MainContent =  () => {

    const [posts, setPosts] = useState<any[]>([]);
    const [loadingPosts, setLoadingPosts] = useState<boolean>(true);
    const [viewRadius, setViewRadius] = useState<number>(20);
    
    useEffect(() => {
        const fetchPosts = async () => {
            setLoadingPosts(true);
            const location = await useLocation();
            if (location) {
                try {
                    const res = await fetch(`http://localhost:8080/posts/feed?lat=${location.lat}&long=${location.long}&maxDistance=${viewRadius * 1609}&limit=${limit}&offset=${offset}`);
                    const data = await res.json();
                    setPosts(data);
                    setLoadingPosts(false);
                } catch (error) {
                    console.log(error);
                }
            }
        };

        fetchPosts();
    }, [viewRadius]);

    return (
        <>
            <div className="absolute top-24"> 
                <LocationRange viewRadius={viewRadius} setViewRadius={setViewRadius} />
            </div>
            <div className="w-full flex flex-col items-center gap-y-4">
                {
                    loadingPosts ? 
                        <Spinner size={"large"} className="mt-5"/> 
                    :
                        posts.length > 0 ? posts.map((post: any) => {
                            return (
                                <Post
                                    key={post._id}
                                    postId={post.postId}
                                    userId={post.userId}
                                    date={post.date}
                                    category={post.category}
                                    title={post.title}
                                    upvotes={post.upvotes}
                                />
                            )
                        }) :
                            <div className="text-2xl text-white w-full md:w-[70%] bg-neutral-100 dark:bg-neutral-800 rounded-xl border-y-muted-foreground p-5">
                                <h1>
                                    Looks like there's no echos near you...
                                </h1>
                                <h1 className="pt-2">
                                    Try increasing your view radius or create one yourself!
                                </h1>
                            </div>
                    }
            </div>
        </>
    )
}

export default MainContent