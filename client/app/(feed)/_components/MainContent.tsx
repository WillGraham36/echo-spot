"use client";
import { use, useEffect, useState } from "react"
import Post from "./Post"
import useLocation from "@/hooks/useLocation"
import LocationRange from "./LocationRange";

const MAX_DIST = 10000000000; //in meters
const limit = 100;
const offset = 0;


const MainContent =  () => {

    const [posts, setPosts] = useState<any[]>([]);
    const [viewRadius, setViewRadius] = useState<number>(20);
    
    useEffect(() => {
        const fetchPosts = async () => {
            const location = await useLocation();
            if (location) {
                try {
                    const res = await fetch(`http://localhost:8080/posts/feed?lat=${location.lat}&long=${location.long}&maxDistance=${viewRadius * 1609}&limit=${limit}&offset=${offset}`);
                    const data = await res.json();
                    setPosts(data);
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
                    posts.map((post: any) => {
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
                    })
                }
            </div>
        </>
    )
}

export default MainContent