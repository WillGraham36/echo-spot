import Navbar from "./_components/Navbar";


const FeedLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="h-screen dark:bg-[#1F1F1F]">
            <Navbar />
            <main className="h-full pt-40">
                {children}
            </main>
        </div>
    );
}

export default FeedLayout;