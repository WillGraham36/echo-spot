export type PostType = {
    _id: string,
    userId: string,
    date: Date
    category: string,
    title: string,
    upvotes: number,
    comments: Array<string>,
}