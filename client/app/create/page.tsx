import PostForm from "./_components/PostForm"


const CreatePostPage = () => {
    return (
        <div className="flex justify-center w-full">
            <div className="w-[100%] md:w-[60%] md:bg-neutral-100 md:dark:bg-neutral-800 md:rounded-xl p-6">
                <h1 className="text-2xl font-medium">
                    Create Post
                </h1>

                <PostForm />    
            </div>
        </div>
    )
}

export default CreatePostPage