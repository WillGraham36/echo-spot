
interface Comment {
    userNumber: number,
    comment: string,
    upvotes: number,
    date: Date
}

interface PostProps {
    tag: string,
    title: string,
    upvotes: number,
    comments: Array<Comment>,
    date: Date

}


const Post = () => {
    return (    
        <div>Post</div>
    )
}

export default Post