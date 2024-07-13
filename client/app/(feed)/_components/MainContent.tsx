import { useEffect } from "react"
import Post from "./Post"

const MainContent = async () => {

    const getPosts = async () => {
        try {
            const res = await fetch('http://localhost:8080/posts')
            return res.json()
        } catch (error) {
            console.log(error);
        }
    }

    const posts = await getPosts();
    console.log(posts)

    return (
        <div className="w-full flex flex-col items-center gap-y-4">
            

            {
                posts.map((post: any) => {
                    return (
                        <Post 
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