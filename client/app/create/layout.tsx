"use client";
import { useUser } from "@clerk/nextjs";
import Navbar from "../(feed)/_components/Navbar";
import { useRouter } from "next/navigation";


const FeedLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {

    const { isSignedIn } = useUser();
    const router = useRouter();

    if(!isSignedIn) {
        router.push("/");
        return null;
    }

    return (
        <div className="h-full dark:bg-[#1F1F1F]">
            <Navbar />
            <main className="h-full pt-40">
                {children}
            </main>
        </div>
    );
}

export default FeedLayout;