import Navbar from "../_components/Navbar";


const FeedLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="dark:bg-[#1F1F1F]">
            <Navbar />
            <main className="pt-20">
                {children}
            </main>
        </div>
    );
}

export default FeedLayout;