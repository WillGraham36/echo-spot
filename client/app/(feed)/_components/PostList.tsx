"use client";
import { Fragment, useEffect, useState } from "react";
import LocationRange from "./LocationRange";
import { Spinner } from "@/components/ui/spinner";
import { PostType } from "@/types/PostType";
import PostCard from "./PostCard";
import { getPosts } from "@/actions/getPosts";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { POSTS_PER_PAGE } from "@/utils/constants";
import getLocation from "@/utils/getLocation";

const PostList =  () => {
    const limit = POSTS_PER_PAGE;
    
    const [posts, setPosts] = useState<PostType[]>([]);
    const [viewRadius, setViewRadius] = useState<number>(20);
    const [offset, setOffset] = useState<number>(0);
    const [postsStatus, setPostsStatus] = useState({
        loading: true,
        error: false,
        noMorePosts: false
    });
    const [scrollTrigger, isInView] = useInView();
    
    /**
     * Fetch posts on initial render as well as when the view radius changes
     */
    useEffect(() => {
        const fetchPosts = async () => {
            const location = await getLocation();
            setPostsStatus({ loading: true, error: false, noMorePosts: false });
            if (location) {
                try {
                    const data = await getPosts({ viewRadius, offset, location, limit });
                    setPosts([...posts, ...data]);
                    setPostsStatus({ loading: false, error: false, noMorePosts: data.length === 0});
                } catch (error) {
                    setPostsStatus({ loading: false, error: true, noMorePosts: false });
                }
            }
        };
        fetchPosts();
    }, [viewRadius]);

    /**
     * Loads more posts when the user scrolls to the bottom of the page
     */
    const loadMorePosts = async () => {
        if(postsStatus.noMorePosts) return;

        const location = await getLocation();
        setOffset((prevOffset) => prevOffset + limit);
        if (location) {
            try {
                const data = await getPosts({ viewRadius, offset: offset + limit, location, limit });
                setPosts((prevPosts) => [...prevPosts, ...data]);
                setPostsStatus({ loading: false, error: false, noMorePosts: data.length < limit });
            } catch (error) {
                setPostsStatus({ loading: false, error: true, noMorePosts: false });
            }
        }
    }
    /**
     * This useEffect is needed so that the loadMorePosts function is called when the user scrolls to the bottom of the page
     */
    useEffect(() => {
        if(isInView && !postsStatus.noMorePosts && !postsStatus.loading) {
            loadMorePosts();
        }
    }, [isInView, !postsStatus.noMorePosts]);

    if(postsStatus.error) {
        return (
            <div className="text-2xl dark:text-white w-full md:w-[70%] bg-neutral-100 dark:bg-neutral-800 rounded-xl border-y-muted-foreground p-10 mt-20">
                <h1>
                    An error has occured, please refresh the page
                </h1>
            </div>
        )
    }
    
    /**
     * Show message when there are no posts to display
     */
    if(postsStatus.noMorePosts && offset === 0) {
        return (
            <div className="text-2xl dark:text-white w-full md:w-[70%] bg-neutral-100 dark:bg-neutral-800 rounded-xl border-y-muted-foreground p-5 mt-20">
                <h1>Looks like there's no echos near you...</h1>
                <h1 className="pt-2">Try increasing your view radius or create one yourself!</h1>
            </div>
        )
    }
    if(postsStatus.loading) {
        return (
            <>
                <div className="absolute top-24">
                    <LocationRange viewRadius={viewRadius} setViewRadius={setViewRadius} />
                </div>
                <Spinner size={"large"} className="mt-28" />
            </>
        )
    }
    
    return (
        <>
            <div className="absolute top-24"> 
                <LocationRange viewRadius={viewRadius} setViewRadius={setViewRadius} />
            </div>
            <div className="w-full flex flex-col items-center gap-y-2 pt-20">
                {posts.map((post: PostType) => {
                        return (
                            <Fragment key={`Fragment-${post._id}`}>
                                <Link href={`/post/${post._id}`} key={`Link-${post._id}`} className="w-full md:w-[70%] hover:bg-neutral-100 dark:bg-[#1F1F1F] dark:hover:bg-neutral-800 md:rounded-xl px-2 pb-1">
                                    <PostCard
                                        post={post}
                                        key={post._id}
                                    />
                                </Link>
                                <Separator className="w-full md:w-[70%] my-0" key={`Separator-${post._id}`}/>
                            </Fragment>
                        )
                    })}
                <div>
                    {!postsStatus.noMorePosts && 
                        <div ref={scrollTrigger}>
                            <Spinner size={"large"} className="mt-28" />
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default PostList