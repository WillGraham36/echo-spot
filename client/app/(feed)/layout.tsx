import Navbar from "../_components/Navbar";


const FeedLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className=" dark:bg-[#1F1F1F]">
            <main className="pt-40">
                {children}
            </main>
        </div>
    );
}

export default FeedLayout;