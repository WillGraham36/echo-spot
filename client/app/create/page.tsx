"use client";
import { useRouter } from "next/navigation";
import PostForm from "./_components/PostForm"
import { ClerkLoaded, ClerkLoading, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";


const CreatePostPage = () => {

    const { isSignedIn, isLoaded } = useUser();
    const router = useRouter();

    useEffect(() => {
        if(!isSignedIn && isLoaded) {
            router.push("/");
        }
    }, [isLoaded, isSignedIn])

    return (
        <>
            <ClerkLoaded>
                <div className="flex justify-center w-full">
                    <div className="w-[100%] md:w-[60%] md:bg-neutral-100 md:dark:bg-neutral-800 md:rounded-xl">

                        <div className="w-full border-b-2 border-neutral-200 dark:border-neutral-700 px-6 pt-6 pb-3">
                            <h1 className="text-3xl font-bold">
                                Create Post
                            </h1>
                        </div>

                        <div className="p-6">
                            <PostForm />
                        </div>
                    </div>
                </div>
            </ClerkLoaded>

            <ClerkLoading>
                <Spinner size={"large"} className="mt-10" />
            </ClerkLoading>
        </>
    )
}

export default CreatePostPage