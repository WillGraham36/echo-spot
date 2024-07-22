"use client";
import { useEffect, useState } from "react"
import useLocation from "@/hooks/useLocation"
import LocationRange from "./LocationRange";
import { Spinner } from "@/components/ui/spinner";
import { PostType } from "@/types/PostType";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/utils/constants";
import PostCard from "./PostCard";
import { getPosts } from "@/actions/getPosts";

const limit = 8;


const MainContent =  () => {

    const [posts, setPosts] = useState<PostType[]>([]);
    const [viewRadius, setViewRadius] = useState<number>(20);
    const [offset, setOffset] = useState<number>(0);

    const [postsStatus, setPostsStatus] = useState({
        loading: true,
        error: false,
        noPostsFound: false
    });
    
    useEffect(() => {
        const fetchPosts = async () => {
            const location = await useLocation();
            setPostsStatus({ loading: (offset > 0), error: false, noPostsFound: false });
            if (location) {
                try {
                    const data = await getPosts({ viewRadius, offset, location, limit });
                    setPosts([...posts, ...data]);
                    setPostsStatus({ loading: false, error: false, noPostsFound: data.length === 0});
                } catch (error) {
                    setPostsStatus({ loading: false, error: true, noPostsFound: false });
                }
            }
        };

        fetchPosts();
    }, [viewRadius, offset]);

    if(postsStatus.error) {
        return (
            <div className="text-2xl dark:text-white w-full md:w-[70%] bg-neutral-100 dark:bg-neutral-800 rounded-xl border-y-muted-foreground p-10 mt-20">
                <h1>
                    An error has occured, please refresh the page
                </h1>
            </div>
        )
    }
    if(postsStatus.noPostsFound) {
        return (
            <div className="text-2xl dark:text-white w-full md:w-[70%] bg-neutral-100 dark:bg-neutral-800 rounded-xl border-y-muted-foreground p-5 mt-20">
                <h1>Looks like there's no echos near you...</h1>
                <h1 className="pt-2">Try increasing your view radius or create one yourself!</h1>
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
                
                {!postsStatus.loading ? (
                    posts.map((post: any) => {
                        return (
                            <PostCard
                                key={post._id}
                                post={post}
                            />
                        )
                    })
                ) : (
                    <>
                        <div className="absolute top-24">
                            <LocationRange viewRadius={viewRadius} setViewRadius={setViewRadius} />
                        </div>
                        <Spinner size={"large"} className="mt-28" />
                    </>
                )}
            </div>
        </>
    )
}

export default MainContent