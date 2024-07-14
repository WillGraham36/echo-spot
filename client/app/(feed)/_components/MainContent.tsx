"use client";
import { use, useEffect, useState } from "react"
import Post from "./Post"
import useLocation from "@/hooks/useLocation"

const MAX_DIST = 10000000000; //in meters
const limit = 100;
const offset = 0;


const MainContent =  () => {

    const [posts, setPosts] = useState<any[]>([]);
    
    useEffect(() => {
        const fetchPosts = async () => {
            const location = await useLocation();
            if (location) {
                try {
                    const res = await fetch(`http://localhost:8080/posts/feed?lat=${location.lat}&long=${location.long}&maxDistance=${MAX_DIST}&limit=${limit}&offset=${offset}`);
                    const data = await res.json();
                    setPosts(data);
                } catch (error) {
                    console.log(error);
                }
            }
        };

        fetchPosts();
    }, []);

    return (
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
    )
}

export default MainContent