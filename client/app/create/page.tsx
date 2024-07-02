import PostForm from "./_components/PostForm"


const CreatePostPage = () => {
    return (
        <div className="flex justify-center w-full">
            <div className="w-[100%] md:w-[60%] md:bg-neutral-100 md:dark:bg-neutral-800 md:rounded-xl">
                
                <div className="w-full border-b-2 border-neutral-200 dark:border-neutral-700 px-6 pt-6 pb-3">
                    <h1 className="text-2xl font-bold">
                        Create Post
                    </h1>
                </div>

                <div className="p-6">
                    <PostForm />    
                </div>
            </div>
        </div>
    )
}

export default CreatePostPage