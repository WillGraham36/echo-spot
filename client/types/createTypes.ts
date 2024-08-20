export type createPostData = {
    title: string,
    category: string,
    upvotes: number,
    location: {
        lat: number,
        long: number,
    }
};
