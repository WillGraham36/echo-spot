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
            
            <Post />
            <Post />
            <Post />

            {
                posts.map((post: any) => {
                    return (
                        <h1>{post.title}</h1>
                    )
                })
            }
        </div>
    )
}

export default MainContent