"use client";
import { useUser } from "@clerk/nextjs";
import Navbar from "../(feed)/_components/Navbar";
import { useRouter } from "next/navigation";


const FeedLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {

    const { isSignedIn, isLoaded } = useUser();
    const router = useRouter();

    if(!isSignedIn && isLoaded) {
        router.push("/");
        return null;
    }

    return (
        <div className="dark:bg-[#1F1F1F]">
            {!isLoaded ? 
                <div>

                </div> 
            : 
                <>
                    <Navbar />
                    <main className="pt-40">
                        {children}
                    </main>
                </>
            }
        </div>
    );
}

export default FeedLayout;