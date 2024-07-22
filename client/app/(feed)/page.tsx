import PageList from "./_components/PageList"

const FeedPage = () => {
    return (
        <div className="min-h-full flex flex-col">
            <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 pb-10">
                <PageList />
            </div>

        </div>
    )
}

export default FeedPage