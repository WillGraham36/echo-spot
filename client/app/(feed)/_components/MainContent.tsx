import Post from "./Post"

const MainContent = () => {
    return (
        <div className="w-full flex flex-col items-center gap-y-4">
            
            <Post />
            <Post />
            <Post />
        </div>
    )
}

export default MainContent