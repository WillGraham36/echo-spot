import Navbar from "../(feed)/_components/Navbar";


const FeedLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
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