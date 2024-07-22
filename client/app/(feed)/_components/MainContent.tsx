"use client";
import { useEffect, useState } from "react"
import Post from "./Post"
import useLocation from "@/hooks/useLocation"
import LocationRange from "./LocationRange";
import { Spinner } from "@/components/ui/spinner";
import { PostType } from "@/types/PostType";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/utils/constants";

const limit = 8;


const MainContent =  () => {

    const [posts, setPosts] = useState<PostType[]>([]);
    const [viewRadius, setViewRadius] = useState<number>(20);
    const [offset, setOffset] = useState<number>(0);

    const [postsStatus, setPostsStatus] = useState({
        loading: true,
        error: false
    });
    
    useEffect(() => {
        const fetchPosts = async () => {
            setPostsStatus({ loading: (offset > 0), error: false });
            const location = await useLocation();
            if (location) {
                try {
                    const res = await fetch(`${API_URL}/posts/feed?lat=${location.lat}&long=${location.long}&maxDistance=${viewRadius * 1609}&limit=${limit}&offset=${offset}`);
                    const data = await res.json();
                    setPosts([...posts, ...data]);
                    setPostsStatus({ loading: false, error: false });
                } catch (error) {
                    setPostsStatus({ loading: false, error: true });
                }
            }
        };

        fetchPosts();
    }, [viewRadius, offset]);

    if(postsStatus.error) {
        return (
            <div className="text-2xl dark:text-white w-full md:w-[70%] bg-neutral-100 dark:bg-neutral-800 rounded-xl border-y-muted-foreground p-5 pt-20">
                <h1>
                    An error has occured, please refresh the page
                </h1>
            </div>
        )
    }
    
    return (
        <>
            <div className="absolute top-24"> 
                <LocationRange viewRadius={viewRadius} setViewRadius={setViewRadius} />
                <Button className="mt-4" onClick={() => setOffset(offset + limit)}>Load More</Button>
            </div>
            <div className="w-full flex flex-col items-center gap-y-4 pt-20">
                
                {posts.length > 0 && (posts.map((post: any) => {
                        return (
                            <Post
                                key={post._id}
                                post={post}
                            />
                        )
                    }))
                }

                {postsStatus.loading ?
                <>
                    <div className="absolute top-24">
                        <LocationRange viewRadius={viewRadius} setViewRadius={setViewRadius} />
                    </div>
                    <Spinner size={"large"} className="mt-28" />
                </> : (
                    posts.length === 0 && 
                        <div className="text-2xl dark:text-white w-full md:w-[70%] bg-neutral-100 dark:bg-neutral-800 rounded-xl border-y-muted-foreground p-5">
                            <h1>Looks like there's no echos near you...</h1>
                            <h1 className="pt-2">Try increasing your view radius or create one yourself!</h1>
                        </div>
                )}
            </div>
        </>
    )
}

export default MainContent